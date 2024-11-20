import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { serialize, parse } from 'cookie';


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const cookies = parse(req.headers.cookie || '');

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
    const ipAddress = Array.isArray(ip) ? ip[0] : ip;

    const response = await axios.get(`https://ipapi.co/${ipAddress}/json/`);
    const { city } = response.data;

    const visitor = {
        ip: ipAddress,
        city: city || 'Unknown',
        timestamp: new Date(),
    };
    if (req.method === 'POST') {
        try {


            const visitCount = parseInt(cookies.visitCount || '0') + 1;

            res.setHeader(
                'Set-Cookie',
                serialize('visitCount', String(visitCount), {
                    path: '/',
                    httpOnly: true,
                    maxAge: 60 * 60 * 24 * 365, // سنة
                })
            );

            return res.status(200).json({
                message: 'Visitor tracked',
                visitor,
                visitCount
            });
        } catch (error) {
            return res.status(500).json({ message: 'Failed to fetch location', error });
        }
    }

    if (req.method === 'GET') {
        // عرض الكوكي عند الطلب
        const visitCount = parseInt(cookies.visitCount || '0');
        return res.status(200).json({
            visitor,
            visitCount
        });
    }

    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
};

export default handler;
