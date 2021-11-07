import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { serialize } from "cookie";
import { randomBytes } from "crypto";
import dbConnect from "../../../lib/dbConnect";
import Session from "../../../models/Session";

type Data = {
  message?: string;
  error?: string;
};

interface Details {
  [key: string]: string;
  client_id: string;
  client_secret: string;
  grant_type: string;
  redirect_uri: string;
  code: string;
}

type TokenResponse = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = req.cookies["session"];
  const state = req.query.state?.toString();

  if (
    !session ||
    !state ||
    decodeURIComponent(session) !== decodeURIComponent(state)
  )
    return res
      .status(401)
      .json({
        error:
          "You do not have a valid session! Please return to /discord/auth",
      });

  const code = req.query.code;

  if (!code || typeof code !== "string")
    return res.status(400).json({ error: "No code query!" });

  const details: Details = {
    client_id: process.env.CLIENT_ID as string,
    client_secret: process.env.CLIENT_SECRET as string,
    grant_type: "authorization_code",
    redirect_uri: "https://ybotdiscord.tech/api/discord/redirect",
    code,
  };

  let formBody: string | string[] = [];

  for (const prop in details) {
    const key = encodeURIComponent(prop);
    const value = encodeURIComponent(details[prop]);
    formBody.push(key + "=" + value);
  }

  formBody = formBody.join("&");

  const response = await axios
    .post("https://discord.com/api/v9/oauth2/token", formBody, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .catch(() => {});

  if (!response) return res.status(401).json({ error: "Invalid Code!" });

  const nonce = randomBytes(16).toString("base64");

  // await redis.set(nonce, (response.data as unknown as TokenResponse).access_token);
  await dbConnect();

  const dbSession = new Session({
    nonce,
    accessToken: (response.data as unknown as TokenResponse).access_token,
  });

  await dbSession.save();

  res.setHeader("Set-Cookie", [
    serialize("access", nonce, { path: "/", maxAge: 60 * 30 }),
    serialize("session", "", {
      maxAge: -1,
      path: "/",
    }),
  ]);

  return res.redirect("https://ybotdiscord.tech/dashboard");
}
