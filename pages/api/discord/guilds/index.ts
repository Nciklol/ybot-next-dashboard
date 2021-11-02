import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from "../../../../lib/dbConnect";
import Session from "../../../../models/Session";

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
    if (!req.cookies['access']) return res.status(404).json({ error: "User does not have a valid user token!"});
    
    await dbConnect;

    const doc = await Session.findOne({ nonce: req.cookies['access'] });
    if (!doc) return res.status(404).json({ error: "User does not have a valid user token!"})
    
    const userGuilds = await axios.get<Guild[]>("https://discord.com/api/v9/users/@me/guilds", {
        headers: {
            "Authorization": `Bearer ${doc.accessToken}`
        }
    }).catch(() => { })

    const botGuilds = await axios.get<Guild[]>("https://discord.com/api/v9/users/@me/guilds", {
        headers: {
            "Authorization": `Bot ${process.env.BOT_TOKEN}`
        }
    }).catch((() => { }));

    if (!userGuilds) return res.status(401).json({ error: "Invalid Token!" });
    if (!botGuilds) return res.status(500).json({ error: "Cannot fetch bot guilds!" });

    const ids = botGuilds.data.map(g => g.id);

    const usableGuilds = userGuilds.data.filter(g => (BigInt(g.permissions) & BigInt(1 << 5)) === BigInt(1 << 5));
    const mutualGuilds = usableGuilds.filter(g => ids.includes(g.id));

    doc.guilds = mutualGuilds;
    doc.markModified("guilds");
    await doc.save();

    return res.status(200).json({ mutualGuilds, rest: usableGuilds.filter(g => !ids.includes(g.id)) });
}