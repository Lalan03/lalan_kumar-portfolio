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

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for") ??
      "127.0.0.1";

    await limiter.check(ip, 5); // max 5 requests per minute

    const { name, email, message } = await req.json();

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


    await connectDB();
    await Contact.create({ name, email, message });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "New Portfolio Contact",
      text: `${name} (${email}) says:\n\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Too many requests" },
      { status: 429 }
    );
  }
}
