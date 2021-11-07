import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../../lib/dbConnect";
import Session from "../../../../../models/Session";
import GuildInfo from "../../../../../models/GuildInfo";

interface Guild {
  id: string;
  name: string;
  owner: boolean;
  permissions: string;
}

interface Role {
  id: string;
  name: string;
  color: number;
  positon: number;
  tags?: {
    bot_id?: string;
  };
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

  const roles = await axios
    .get<Role[]>(`https://discord.com/api/v9/guilds/${guildID}/roles`, {
      headers: {
        Authorization: `Bot ${process.env.BOT_TOKEN}`,
      },
    })
    .catch(() => {});

  if (!roles) {
    return res
      .status(500)
      .json({ error: "I don't have permissions to manage roles!" });
  }

  doc2["_id"] = null;
  doc2["__v"] = null;

  const botRole = roles.data.find(
    (r) => r.tags?.bot_id == process.env.CLIENT_ID
  );

  return res.status(200).json({ settings: doc2, roles: roles.data, botRole });
}
