import type { NextApiRequest, NextApiResponse } from 'next'
import { serialize } from 'cookie';
import { randomBytes } from "crypto";

const baseURL = "https://discord.com/api/oauth2/authorize?client_id=480926911095111682&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fdiscord%2Fredirect&response_type=code&scope=identify%20guilds"

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const nonce = randomBytes(16).toString('base64');
    res.setHeader('Set-Cookie', serialize('session', encodeURIComponent(nonce), { path: '/' }));
    res.redirect(baseURL + `&state=${encodeURIComponent(nonce)}`)
}