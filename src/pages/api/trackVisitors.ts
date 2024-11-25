import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {

        const API_KEY = 'b61d6adf26d94c84b748f66c38ddbc52'; // ضع مفتاحك هنا

        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
        const ipAddress = Array.isArray(ip) ? ip[0] : ip;
        let response = { data: { city: 'unknow' } }
        try {

            response = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}&ip=${ipAddress}`);
        } catch (error) {
            console.log('Server error:', error);
        }
        const { city } = response.data;

        const visitor = {
            ip: ipAddress,
            city: city || 'Unknown',
            timestamp: new Date(),
        };
        res.setHeader('Allow', ['GET', 'POST']);

        if (req.method === 'POST') {
            try {

                return res.status(200).json({
                    message: 'Visitor tracked',
                    visitor,
                });
            } catch (error) {
                return res.status(500).json({ message: 'Failed to fetch location', error });
            }
        }

        if (req.method === 'GET') {
            return res.status(200).json({
                visitor,
            });
        }
        res.status(405).end(`Method ${req.method} Not Allowed`);
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ message: 'Failed to process the request', error });
    }
};

export default handler;
