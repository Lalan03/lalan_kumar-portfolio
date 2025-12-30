import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Contact from "@/models/Contact";
import { transporter } from "@/lib/mail";
import { rateLimit } from "@/lib/rateLimit";

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
});

async function verifyTurnstile(token: string, ip: string) {
  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET_KEY!,
        response: token,
        remoteip: ip,
      }),
    }
  );

  const data = await res.json();
  return data.success === true;
}

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for") ??
      req.headers.get("x-real-ip") ??
      "127.0.0.1";

    const { name, email, message, token } = await req.json();

    // 1️⃣ CAPTCHA CHECK (FIRST)
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Captcha required" },
        { status: 400 }
      );
    }

    const captchaValid = await verifyTurnstile(token, ip);
    if (!captchaValid) {
      return NextResponse.json(
        { success: false, error: "Captcha verification failed" },
        { status: 403 }
      );
    }

    // 2️⃣ RATE LIMIT
    await limiter.check(ip, 5);

    // 3️⃣ VALIDATION
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address" },
        { status: 400 }
      );
    }

    if (message.length > 1000) {
      return NextResponse.json(
        { success: false, error: "Message too long" },
        { status: 400 }
      );
    }

    // 4️⃣ DB
    await connectDB();
    await Contact.create({ name, email, message });

    // 5️⃣ EMAIL
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "New Portfolio Contact",
      text: `${name} (${email}) says:\n\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);

    return NextResponse.json(
      { success: false, error: "Too many requests. Please try later." },
      { status: 429 }
    );
  }
}
