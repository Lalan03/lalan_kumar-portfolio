"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-24 py-32 px-6"    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* IMAGE (DESKTOP ONLY) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="hidden md:flex justify-start"
        >
          <div
            className="
              relative
              w-56 h-80
              rounded-xl
              overflow-hidden
              border border-zinc-800
              shadow-[0_14px_40px_rgba(0,0,0,0.5)]
            "
          >
            <Image
              src="/profile.jpg"
              alt="Lalan Kumar"
              fill
              className="
                object-cover
                object-top
                contrast-110
                brightness-105
              "
            />
          </div>
        </motion.div>

        {/* TEXT */}
        <div>
          <motion.h2
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-semibold"
          >
            About Me
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-4 text-gray-400 leading-relaxed"
          >
            I am a full stack developer with experience in MERN, backend systems,
            and AI/ML projects. I enjoy building scalable, production-ready
            applications with clean UI/UX.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-4 text-gray-400 leading-relaxed"
          >
            I work across the stack — from crafting intuitive interfaces to
            designing robust APIs and deploying reliable systems.
          </motion.p>
        </div>

      </div>
    </section>
  );
}
