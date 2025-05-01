import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { writeFile } from 'fs/promises';


async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
): Promise<void> {

    switch (req.method) {
        case "GET":
            return res.status(400).json({ message: 'Method Not Allowed' });
        case "PATCH":
            return PATCH(req, res);
        case "PUT":
            return res.status(400).json({ message: 'Method Not Allowed' });
        case "DELETE":
            return res.status(400).json({ message: 'Method Not Allowed' });
        case "POST":
            return res.status(400).json({ message: 'Method Not Allowed' });
    }
    return res.status(400).json({ message: 'Method Not Allowed' });
}



async function PATCH(
    req: NextApiRequest,
    res: NextApiResponse<any>,
): Promise<any> {

    const { slug, data } = req.body;

    if (!slug || !data) return res.status(400).json({ error: 'Missing slug or data' });

    const filePath = path.join(process.cwd(), 'content', `${slug}.json`);
    await writeFile(filePath, JSON.stringify(req.body.data, null, 2));
    res.status(200).json({ message: 'Content saved.' });
}





export default handler;