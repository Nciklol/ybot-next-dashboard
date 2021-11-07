import { serialize } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Session from "../../../models/Session";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.cookies || !req.cookies["access"])
    return res
      .status(401)
      .json({ error: "Cannot terminate a sesssion because there isn't one!" });
  await dbConnect;

  Session.findOneAndRemove({ nonce: req.cookies["access"] });

  res.setHeader(
    "Set-Cookie",
    serialize("access", "", {
      maxAge: -1,
      path: "/",
    })
  );

  res.redirect("https://ybotdiscord.tech");
}
