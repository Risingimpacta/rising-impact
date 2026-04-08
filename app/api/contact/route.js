import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {

  const {
    name,
    email,
    phone,
    whatsapp,
    teams,
    googleMeet,
    linkedin,
    message
  } = await req.json();

  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0] : "IP Not Found";
  const userAgent = req.headers.get("user-agent");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER,
    subject: "New Client Enquiry - Rising Impact",
    html: `
      <h2>New Client Enquiry</h2>

      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone}</p>
      <p><b>WhatsApp:</b> ${whatsapp}</p>
      <p><b>Microsoft Teams:</b> ${teams}</p>
      <p><b>Google Meet:</b> ${googleMeet}</p>
      <p><b>LinkedIn:</b> ${linkedin}</p>

      <p><b>Message:</b></p>
      <p>${message}</p>

      <hr>

      <h3>Visitor Details</h3>
      <p><b>IP Address:</b> ${ip}</p>
      <p><b>Browser:</b> ${userAgent}</p>
      <p><b>Time:</b> ${new Date().toLocaleString()}</p>
    `
  });

  return NextResponse.json({
    message: "Your enquiry has been sent successfully!"
  });
}