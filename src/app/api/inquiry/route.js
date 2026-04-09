import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, company, country, email, message } = body;

    // 1. Validation (Check if environment variables are set)
    const transporterUser = process.env.EMAIL_USER;
    const transporterPass = process.env.EMAIL_PASS;

    if (!transporterUser || !transporterPass || transporterPass === 'YOUR_DAUM_APP_PASSWORD_HERE') {
      console.warn("⚠️ [API Warning]: Email credentials not configured in .env.local");
      return NextResponse.json(
        { message: "Server email configuration incomplete." },
        { status: 500 }
      );
    }

    // 2. Transporter configuration (Daum/Hanmail SMTP)
    const transporter = nodemailer.createTransport({
      host: 'smtp.daum.net',
      port: 465, // SSL
      secure: true, // true for 465
      auth: {
        user: transporterUser,
        pass: transporterPass,
      },
    });

    // 3. Mail options
    const mailOptions = {
      from: transporterUser, // Must usually be the auth user for SMTP
      to: 'waterpass1@daum.net',
      subject: `[WaterPass Inquiry] New Message from ${name} (${company || 'No Company'})`,
      text: `
        Name: ${name}
        Company: ${company || 'N/A'}
        Country: ${country || 'N/A'}
        Email: ${email}
        
        Message:
        ${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #e5e7eb; padding: 20px; border-radius: 12px; background-color: #f9fafb;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">New Inquiry Received</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Company:</strong> ${company || 'N/A'}</p>
          <p><strong>Country:</strong> ${country || 'N/A'}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;">
          <p><strong>Message:</strong></p>
          <div style="background-color: white; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb; white-space: pre-wrap;">${message}</div>
          <p style="font-size: 12px; color: #6b7280; margin-top: 20px; text-align: center;">Sent from WaterPass Global Website</p>
        </div>
      `,
    };

    // 4. Send the actual email
    await transporter.sendMail(mailOptions);

    console.log("✅ [Email Sent Successfully]");
    return NextResponse.json({ message: "Success" }, { status: 200 });

  } catch (error) {
    console.error("❌ [API Error]:", error);
    return NextResponse.json(
      { message: "Inquiry could not be sent. Please check server logs." },
      { status: 500 }
    );
  }
}
