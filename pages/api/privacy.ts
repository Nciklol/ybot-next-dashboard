import type { NextApiRequest, NextApiResponse } from 'next'
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    return res.redirect("https://gist.github.com/Nciklol/54098d574e63d3dab73f1107fe42549e");
}