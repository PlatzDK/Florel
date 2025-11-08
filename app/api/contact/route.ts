import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, arrival, departure, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Manglende felter" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: Number(process.env.SMTP_PORT ?? 587) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const textContent = `Ny forespørgsel fra ${name}\n\nEmail: ${email}\nTelefon: ${phone}\nAnkomst: ${arrival}\nAfrejse: ${departure}\n\nBesked:\n${message}`;

    await transporter.sendMail({
      from: process.env.SMTP_FROM ?? "kontakt@skovkrogen37.dk",
      to: "kontakt@skovkrogen37.dk",
      subject: "Ny bookingforespørgsel via hjemmesiden",
      text: textContent
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Serverfejl" }, { status: 500 });
  }
}
