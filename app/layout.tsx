import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";

import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import ThemeProvider from "@/components/ThemeProvider";
import ScrollProgress from "@/components/ScrollProgress";
import { Analytics } from "@vercel/analytics/react";
import Footer from "@/components/Footer";



export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),

  title: "Lalan Kumar | Full Stack Developer",
  description:
    "Full Stack Developer & AI/ML Engineer building scalable, production-ready web applications.",

  openGraph: {
    title: "Lalan Kumar | Portfolio",
    description:
      "Full Stack Developer & AI/ML Engineer building scalable, production-ready applications.",
    url: "/",
    siteName: "Lalan Kumar Portfolio",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Lalan Kumar Portfolio",
      },
    ],
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Content Security Policy */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="
            default-src 'self';
            script-src 'self' https://challenges.cloudflare.com 'unsafe-inline';
            style-src 'self' 'unsafe-inline';
            img-src 'self' data: https:;
            frame-src https://challenges.cloudflare.com;
            connect-src 'self' https://challenges.cloudflare.com;
            font-src 'self' data:;
          "
        />
      </head>

      <body className="bg-white text-black dark:bg-black dark:text-white transition-colors duration-300 antialiased">
        <ScrollProgress />

        <ThemeProvider>
          <SmoothScroll>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </SmoothScroll>
        </ThemeProvider>
        <Analytics />



        
        {/* Cloudflare Turnstile */}
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
