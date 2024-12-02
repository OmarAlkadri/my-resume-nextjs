import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import Visitor from '@/models/Visitor';
import dbConnect from '@/lib/mongodb';
import emailjs from 'emailjs-com';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await dbConnect();

        const API_KEY = 'b61d6adf26d94c84b748f66c38ddbc52';

        const ip = await fetch('https://api.ipify.org?format=json').then((res) => res.json());
        //ip.ip
        const ipAddress = ip.ip;

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

                await emailjs.send(
                    'service_au36n7r',
                    'template_3ydh4qk',
                    {
                        to_name: 'Omar Alkadri',
                        name: ipAddress + ' ' + locationData.city,
                        from_name: ipAddress + ' ' + locationData.city,
                        email: 'omar.omar.alkadri111@gmail.com',
                        reply_to: 'omar.omar.alkadri111@gmail.com',
                        phone: '5396711355',
                        message: `
                        isp: ${locationData.isp}
                        languages: ${locationData.languages} 
                        latitude: ${locationData.latitude}
                        longitude: ${locationData.longitude}
                        organization: ${locationData.organization}
                        zipcode: ${locationData.zipcode}`,
                    },
                    '0Duit5ctOLrKA_TL0'
                );
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
