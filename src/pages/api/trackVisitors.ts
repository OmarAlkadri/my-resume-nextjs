import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import Visitor from '@/models/Visitor'; // استيراد نموذج MongoDB
import dbConnect from '@/lib/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await dbConnect();

        const API_KEY = 'b61d6adf26d94c84b748f66c38ddbc52';

        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
        const ipAddress = Array.isArray(ip) ? ip[0] : ip;

        if (req.method === 'GET') {
            let visitor = await Visitor.findOne({ ip: ipAddress });

            if (!visitor) {
                let locationData = { city: 'Unknown' };
                try {
                    const response = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}&ip=${ipAddress}`);
                    locationData = response.data;
                } catch (error) {
                    console.error('Error fetching location:', error);
                }

                visitor = await Visitor.create({
                    ip: ipAddress,
                    city: locationData.city,
                    timestamp: new Date(),
                });
            }

            const visitorCount = await Visitor.countDocuments();

            return res.status(200).json({
                message: 'Visitor tracked successfully',
                visitor,
                visitorCount,
            });
        }

        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ message: 'Failed to process the request', error });
    }
};

export default handler;
