import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { estimatePrice, formatCurrency } from "@/lib/pricing";
import { isRangeAvailable, parseDate } from "@/lib/availability";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, arrival, departure, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Manglende felter" }, { status: 400 });
    }

    if (!arrival || !departure) {
      return NextResponse.json({ error: "Vælg både ankomst og afrejse", field: "dates" }, { status: 400 });
    }

    const arrivalDate = parseDate(arrival);
    const departureDate = parseDate(departure);

    if (!isRangeAvailable(arrivalDate, departureDate)) {
      return NextResponse.json({ error: "Datoerne er optaget eller ugyldige", field: "dates" }, { status: 400 });
    }

    const quote = estimatePrice(arrivalDate, departureDate);
    const priceText = quote
      ? `${formatCurrency(quote.total)} (${quote.nights} nætter, ${quote.tier.name})`
      : "Ingen prisberegning";

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: Number(process.env.SMTP_PORT ?? 587) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const textContent = `Ny forespørgsel fra ${name}\n\nEmail: ${email}\nTelefon: ${phone}\nAnkomst: ${arrival}\nAfrejse: ${departure}\nEstimeret pris: ${priceText}\n\nBesked:\n${message}`;

    await transporter.sendMail({
      from: process.env.SMTP_FROM ?? "kontakt@skovkrogen37.dk",
      to: "kontakt@skovkrogen37.dk",
      subject: "Ny bookingforespørgsel via hjemmesiden",
      text: textContent
    });

    return NextResponse.json({ success: true, quote });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Serverfejl" }, { status: 500 });
  }
}
