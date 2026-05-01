import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function test() {
    const transporter = nodemailer.createTransport({
      host: 'smtp.daum.net',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'waterpass1@daum.net',
      subject: '[Test] WaterPass Global Verification',
      text: 'Ash is testing the email system. If you see this, it works!',
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('✅ Email sent successfully!');
    } catch (error) {
      console.error('❌ Email failed:', error);
    }
}

test();
