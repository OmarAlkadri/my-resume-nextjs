import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import Visitor from '@/models/Visitor';
import dbConnect from '@/lib/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await dbConnect();

        const API_KEY = 'b61d6adf26d94c84b748f66c38ddbc52';

        // const ip = await fetch('https://api.ipify.org?format=json').then((res) => res.json());
        //ip.ip
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';

        let ipAddress = Array.isArray(ip) ? ip[0] : ip;
        if (ipAddress == '::1') {
            const ip = await fetch('https://api.ipify.org?format=json').then((res) => res.json());
            ipAddress = ip.ip;
        }

        //  const ipAddress = ip.ip;
        let isTrue = false;

        if (req.method === 'GET') {
            let visitor = await Visitor.findOne({ ip: ipAddress });

            if (!visitor) {
                let locationData = {
                    city: 'Unknown',
                    isp: '',
                    languages: '',
                    latitude: '',
                    longitude: '',
                    organization: '',
                    zipcode: '',
                };
                try {
                    const response = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}&ip=${ipAddress}`);
                    locationData = response.data;
                } catch (error) {
                    console.error('Error fetching location:', error);
                }

                visitor = await Visitor.create({
                    ip: ipAddress,
                    city: locationData.city,
                    isp: locationData.isp,
                    languages: locationData.languages,
                    latitude: locationData.latitude,
                    longitude: locationData.longitude,
                    organization: locationData.organization,
                    zipcode: locationData.zipcode,
                    timestamp: new Date(),
                });
                isTrue = true


            }
            const text = `isp: ${visitor.isp}\nlanguages: ${visitor.languages}\nlatitude: ${visitor.latitude}\nlongitude: ${visitor.longitude}\norganization: ${visitor.organization}\nzipcode: ${visitor.zipcode}`
            const visitorCount = await Visitor.countDocuments();

            return res.status(200).json({
                message: 'Visitor tracked successfully',
                visitor,
                visitorCount,
                text,
                isTrue
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
