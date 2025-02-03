import nodemailer from "nodemailer";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { name, phone, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'omar.omar.alkadri111@gmail.com',
            pass: 'bmlv zynr mdvj nill'//'Qatana90',
        },
    });

    const mailOptions = {
        from: 'omar.omar.alkadri111@gmail.com',
        to: 'omar.omar.alkadri111@gmail.com',
        subject: `${name}`,
        text: `Visitor Details:
               Name: ${name}
               Phone: ${phone}
               Message:
               ${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Error sending email" });
    }
}
