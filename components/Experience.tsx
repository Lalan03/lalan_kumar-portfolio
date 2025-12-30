"use client";

import { motion } from "framer-motion";

type TimelineItem = {
  title: string;
  org: string;
  period: string;
  points: string[];
};

const experiences: TimelineItem[] = [
  {
    title: "Acadmic Projects Lead",
    org: "Techno India University",
    period: "Jul 2023 – Present",
    points: [
      "Lead a team of 5 students and managed end-to-end project development.",
      "Planned architecture, assigned roles, and monitored progress",
      "Participated in coding, testing, and integration of modules.",
      "Successfully delivered the project within deadline with positive faculty evaluation.",
    ],
  },
];

const education: TimelineItem[] = [
  {
    title: "B.Tech in Computer Science and Business System",
    org: "Techno India University, Kolkata, West Bengal",
    period: "2022 – 2026",
    points: [
      "Core subjects: DSA, DBMS, OS, AI/ML, Data Science, Computer Networks, Image Processing.",
      "Built academic and personal projects in web & AI.",
    ],
  },
  {
    title: "Class XII (Senior Secondary)",
    org: "Kun-Kun Devi +2 High School Fulkaha, Araria",
    period: "2019 - 2021",
    points: [
        "Core subjects: Mathematics, Physics, Chemistry, Biology",
    ],
  },

  {
    title: "Class X (Secondary)",
    org: "Kun-Kun Devi High School Fulkaha, Araria",
    period: "2017 - 2018",
    points: [
        
    ],
  },
];

function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="relative border-l border-zinc-800 pl-12 space-y-20">
      {items.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* TITLE ROW (DOT + TEXT PERFECTLY ALIGNED) */}
          <div className="flex items-start gap-3 -ml-[18px]">
            {/* DOT */}
            <span
              className="
                mt-[6px]
                w-3 h-3
                rounded-full
                bg-white
                flex-shrink-0
              "
            />

            {/* TITLE */}
            <h3 className="text-lg font-semibold leading-snug">
              {item.title}
            </h3>
          </div>

          {/* ORG + DATE */}
          <p className="mt-1 ml-1 text-sm text-gray-400">
            {item.org} • {item.period}
          </p>

          {/* BULLETS */}
          <ul className="mt-4 ml-1 space-y-2 text-gray-400 text-sm list-disc list-inside">
            {item.points.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}


export default function Experience() {
  return (
    <section
      id="experience"
        className="scroll-mt-24 py-32 px-6"    >
      <div className="max-w-5xl mx-auto space-y-28">

        {/* EXPERIENCE */}
        <div>
          <motion.h2
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-semibold mb-14"
          >
            Experience
          </motion.h2>

          <Timeline items={experiences} />
        </div>

        {/* EDUCATION */}
        <div>
          <motion.h2
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-semibold mb-14"
          >
            Education
          </motion.h2>

          <Timeline items={education} />
        </div>

      </div>
    </section>
  );
}
