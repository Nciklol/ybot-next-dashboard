import type { NextApiRequest, NextApiResponse } from 'next'
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    return res.redirect("https://discord.gg/STe9YQgtz2");
}