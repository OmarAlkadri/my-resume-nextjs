import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const visitors: { ip: string; city: string; timestamp: Date }[] = [];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all domains or use a specific domain like 'https://example.com'
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'GET') {
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
        const ipAddress = Array.isArray(ip) ? ip[0] : ip;

        try {
            const response = await axios.get(`https://ipapi.co/${ipAddress}/json/`);
            const { city } = response.data;

            const visitor = {
                ip: ipAddress,
                city: city || 'Unknown',
                timestamp: new Date(),
            };

            visitors.push(visitor);


            return res.status(200).json({ message: 'Visitor tracked', visitor, totalVisitors: visitors.length });
        } catch (error) {
            return res.status(500).json({ message: 'Failed to fetch location', error });
        }
    }

    if (req.method === 'GET') {
        return res.status(200).json({ totalVisitors: visitors.length, visitors });
    }

    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
};

export default handler;
