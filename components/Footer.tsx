"use client";

import { track } from "@vercel/analytics";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  const isMobile = () => window.innerWidth < 768;

  const handleResumeDownload = () => {
    track("resume_download", {
      source: "footer",
      role: "full_stack_ai_ml",
      device: isMobile() ? "mobile" : "desktop",
    });
  };

  const handleSocialClick = (platform: "linkedin" | "github") => {
    track("social_click", {
      platform,
      source: "footer",
      device: isMobile() ? "mobile" : "desktop",
    });
  };

  return (
    <footer className="border-t border-zinc-800 bg-black">
      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* ================= TOP ROW ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-10">

          {/* LEFT — BRAND */}
          <div className="space-y-2 text-center md:text-left">
            <p className="text-white font-semibold text-base">
              Lalan Kumar
            </p>
            <p className="text-sm text-gray-400">
              Full Stack Developer · AI/ML Engineer
            </p>

            {/* STATUS BADGE */}
            <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs text-green-400">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              Actively looking for work.....
            </div>
          </div>

          {/* CENTER — SOCIAL ICONS */}
          <div className="flex justify-center items-center gap-8 text-xl text-gray-400">
            <a
              href="https://www.linkedin.com/in/lalan-kumar-5177b6259/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleSocialClick("linkedin")}
              aria-label="LinkedIn"
              className="hover:text-white transition"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://github.com/Lalan03"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleSocialClick("github")}
              aria-label="GitHub"
              className="hover:text-white transition"
            >
              <FaGithub />
            </a>

            <a
              href="mailto:lk180186@gmail.com"
              aria-label="Email"
              className="hover:text-white transition"
            >
              <FaEnvelope />
            </a>
          </div>

          {/* RIGHT — RESUME CTA */}
          <div className="flex justify-center md:justify-end">
            <a
              href="/resume.pdf"
              download
              onClick={handleResumeDownload}
              className="
                inline-flex items-center justify-center
                rounded-lg border border-zinc-700
                px-6 py-3 text-sm font-medium
                text-white hover:bg-zinc-900 transition
              "
            >
              Download Resume
            </a>
          </div>
        </div>

        {/* ================= DIVIDER ================= */}
        <div className="my-10 h-px bg-zinc-800" />

        {/* ================= BOTTOM ROW ================= */}
        <div className="relative flex items-center justify-center text-xs text-gray-500">
  {/* CENTER */}
  <span>
    © {new Date().getFullYear()} Lalan Kumar. All rights reserved.
  </span>

  {/* RIGHT — ADMIN LOGIN */}
  <a
    href="/admin/login"
    className="
      absolute right-0
      hover:text-white
      transition
      underline-offset-4
      hover:underline
      hidden md:inline
    "
  >
    Admin Login
  </a>
</div>

      </div>
    </footer>
  );
}
