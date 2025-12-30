"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiMongodb,
  SiPython,
  SiTensorflow,
  SiHtml5,
  SiCss3,
  SiMysql,
  SiFastapi,
  SiPandas,
  SiNumpy,
} from "react-icons/si";

type Skill = {
  name: string;
  value: number;
  experience: string;
  icon: ReactNode;
};

const skillGroups: { title: string; skills: Skill[] }[] = [
  {
    title: "Frontend",
    skills: [
      {
        name: "HTML",
        value: 90,
        experience: "3+ yrs",
        icon: <SiHtml5 />,
      },
      {
        name: "CSS",
        value: 90,
        experience: "3+ yrs",
        icon: <SiCss3/>,
      },
      {
        name: "JavaScript",
        value: 90,
        experience: "3+ yrs",
        icon: <SiJavascript />,
      },
      {
        name: "TypeScript",
        value: 85,
        experience: "2+ yrs",
        icon: <SiTypescript />,
      },
      {
        name: "React",
        value: 88,
        experience: "3+ yrs",
        icon: <SiReact />,
      },
      {
        name: "Next.js",
        value: 85,
        experience: "2+ yrs",
        icon: <SiNextdotjs />,
      },
    ],
  },
  {
    title: "Backend",
    skills: [
      {
        name: "Node.js",
        value: 85,
        experience: "3+ yrs",
        icon: <SiNodedotjs />,
      },
      {
        name: "MySQL",
        value: 80,
        experience: "1+ yrs",
        icon: <SiMysql/>,
      },
      {
        name: "REST APIs",
        value: 90,
        experience: "1+ yrs",
        icon: <SiFastapi/>,
      },
      {
        name: "MongoDB",
        value: 80,
        experience: "2+ yrs",
        icon: <SiMongodb />,
      },
    ],
  },
  {
    title: "AI / ML",
    skills: [
      {
        name: "Python",
        value: 75,
        experience: "2 yrs",
        icon: <SiPython />,
      },
      {
        name: "TensorFlow",
        value: 65,
        experience: "1 yr",
        icon: <SiTensorflow />,
      },
      {
        name: "Pandas",
        value: 95,
        experience: "1 yrs",
        icon: <SiPandas/>,
      },
      {
        name: "Numpy",
        value: 95,
        experience: "1 yrs",
        icon: <SiNumpy/>
      },
      
    ],
  },
];

function RadialSkill({ skill }: { skill: Skill }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (skill.value / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="flex flex-col items-center text-center"
    >
      <div className="relative w-24 h-24">
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="rgb(39,39,42)"
            strokeWidth="6"
            fill="transparent"
          />
          <motion.circle
            cx="48"
            cy="48"
            r={radius}
            stroke="white"
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1 }}
            strokeLinecap="round"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl">{skill.icon}</span>
          <span className="text-xs text-gray-400 mt-1">
            {skill.value}%
          </span>
        </div>
      </div>

      <p className="mt-3 font-medium">{skill.name}</p>
      <p className="text-xs text-gray-500">{skill.experience}</p>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="scroll-mt-20 py-28 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-semibold mb-14"
        >
          Skills
        </motion.h2>

        <div className="space-y-20">
          {skillGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-xl font-semibold mb-8 text-gray-300">
                {group.title}
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10">
                {group.skills.map((skill) => (
                  <RadialSkill key={skill.name} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
