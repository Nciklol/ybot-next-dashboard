import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../../lib/dbConnect";
import GuildInfo from "../../../../../models/GuildInfo";
import Session from "../../../../../models/Session";

interface Guild {
  id: string;
  name: string;
  owner: boolean;
  permissions: string;
}

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

  const guildID = req.query.id;

  if (!guildID) return res.status(400).json({ error: "No Guild ID was sent!" });

  if (!doc.guilds?.some((g: Guild) => g.id === guildID))
    return res.status(403).json({ error: "Not authorized to get this guild!" });

  const doc2 = await GuildInfo.findOne({ serverID: guildID });

  if (!doc2)
    return res
      .status(500)
      .json({ error: "No guild document found with this ID" });

  for (const prop in req.body) {
    if (prop === "eco") {
      if (req.body[prop] !== 0 && req.body[prop] !== 1)
        return res
          .status(400)
          .json({ error: "pls don't hit my api, kind of rude" });
      doc2[prop] = req.body[prop];
      doc2.markModified(`${prop}`);
    } else if (prop === "muteRole") {
      doc2[prop] = req.body[prop];
      doc2.markModified(`${prop}`);
    }
  }

  await doc2.save();

  return res
    .status(200)
    .json({
      success: "Everything went well! Thanks for making me send this, nextapi.",
    });
}
