"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { track } from "@vercel/analytics";


export default function Hero() {
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(textRef.current, {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    }).from(
      imageRef.current,
      {
        x: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.6"
    );
  }, []);

  return (
    <section
      id="hero"
      
      className="
        min-h-screen
        pt-32               /* OFFSET FOR NAVBAR */
        pb-24
        flex items-center
        px-6
      "
    >
      <div
        className="
          max-w-6xl mx-auto
          grid grid-cols-1 md:grid-cols-2
          gap-8              /* REDUCED GAP */
          items-center
          w-full
        "
      >
        {/* LEFT — TEXT */}
        <div ref={textRef}>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Lalan Kumar
          </h1>

          <p className="mt-6 text-sm text-gray-400 leading-relaxed max-w-3xl">
            Full Stack Developer | AI/ML Engineer | DevOps | IBM National Hackathon Winner 2025
          </p>

          <div className="mt-8 flex gap-4 flex-wrap">


            <a
               href="/resume.pdf"
                download
                onClick={() =>
                track("resume_download", {
                source: "hero",
                role: "full_stack_ai_ml",
                })
               }
                className="px-6 py-3 bg-white text-black font-medium rounded-sm"
              >
                Download Resume
              </a>



            <a
              href="#contact"
              className="px-6 py-3 border border-zinc-700 rounded-sm hover:bg-zinc-900 transition"
            >
              Contact Me
            </a>
          </div>
        </div>

        {/* RIGHT — IMAGE */}
        <div
          ref={imageRef}
          className="hidden md:flex justify-end"
        >
          <div
            className="
              relative
              w-64 h-85           /* CONTROLLED SIZE */
              rounded-2xl
              overflow-hidden
              border border-zinc-800
              shadow-[0_16px_50px_rgba(0,0,0,0.6)]
            "
          >
            <Image
              src="/profile.jpg"
              alt="Lalan Kumar"
              fill
              priority
              className="
                object-cover
                object-top
                contrast-110
                brightness-105
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
}
