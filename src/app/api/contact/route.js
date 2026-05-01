import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  console.log("🚀 [Kodari Mail Engine]: Inquiry request received.");
  
  try {
    const body = await request.json();
    const { name, company, country, email, message } = body;

    const transporterUser = process.env.EMAIL_USER;
    const transporterPass = process.env.EMAIL_PASS;

    if (!transporterUser || !transporterPass) {
      console.error("❌ [Kodari Mail Engine]: Critical missing credentials in .env.local");
      return NextResponse.json(
        { message: "Server configuration incomplete. Check environment variables." },
        { status: 500 }
      );
    }

    // 2. Transporter configuration with Enhanced Handshake
    const transporter = nodemailer.createTransport({
      host: 'smtp.daum.net',
      port: 465,
      secure: true, 
      auth: {
        user: transporterUser,
        pass: transporterPass,
      },
      timeout: 10000, 
      greetingTimeout: 5000,
      connectionTimeout: 10000,
      logger: true, // Enable detailed SMTP handshake logs in terminal
      debug: true   // Enable debug output
    });

    // 3. Mail options
    const mailOptions = {
      from: transporterUser, 
      to: 'waterpass1@daum.net',
      subject: `[WaterPass Global Website Inquiry] From: ${name}`,
      text: `Name: ${name}\nCompany: ${company}\nCountry: ${country}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; padding: 20px; background-color: #0f172a; color: white;">
          <h2 style="color: #00AEEF;">New Inquiry from ${name}</h2>
          <p><strong>Company:</strong> ${company || 'N/A'}</p>
          <p><strong>Country:</strong> ${country || 'N/A'}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr style="border-color: #1e293b;" />
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    };

    // 4. Send with Retry Logic (Max 2 attempts)
    let attempts = 0;
    while (attempts < 2) {
      try {
        await transporter.sendMail(mailOptions);
        console.log("✅ [Kodari Mail Engine]: Email delivered successfully to waterpass1@daum.net");
        return NextResponse.json({ message: "Success" }, { status: 200 });
      } catch (sendErr) {
        attempts++;
        console.warn(`⚠️ [Kodari Mail Engine]: Attempt ${attempts} failed. ${attempts < 2 ? 'Retrying...' : 'Falling through.'}`);
        if (attempts >= 2) throw sendErr;
        await new Promise(r => setTimeout(r, 2000)); // 2s delay before retry
      }
    }

  } catch (error) {
    console.error("❌ [Kodari Mail Engine Critical Error]:", error);
    return NextResponse.json(
      { 
        message: "Failed to send inquiry. Please contact technical support.",
        error: error.message 
      },
      { status: 500 }
    );
  }
}
