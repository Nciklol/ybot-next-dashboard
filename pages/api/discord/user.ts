import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Session from "../../../models/Session";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.cookies["access"])
    return res
      .status(404)
      .json({ error: "User does not have a valid user token!" });
  await dbConnect;

  const doc = await Session.findOne({ nonce: req.cookies["access"] });
  if (!doc)
    return res
      .status(404)
      .json({ error: "User does not have a valid user token!" });

  const response = await axios
    .get("https://discord.com/api/v9/users/@me", {
      headers: {
        Authorization: `Bearer ${doc.accessToken}`,
      },
    })
    .catch(() => {});

  if (!response) return res.status(401).json({ error: "Invalid Token!" });

  return res.status(200).json(response.data);
}
