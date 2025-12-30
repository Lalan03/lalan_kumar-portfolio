"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Project = {
  title: string;
  description: string;
  tech: string[];
  category: "Frontend" | "Backend" | "Full-Stack" | "AI";
  link: string;
};

const projects: Project[] = [
  {
    title: "Kasparro ETL & Backend System",
    description: "Built a production-grade ETL and FastAPI backend that ingests data from APIs, CSV, and JSON sources with incremental checkpointing, canonical deduplication, auditability, and Prometheus-based observability; deployed on Railway with PostgreSQL and Docker.",
    tech: ["Python", "FastAPI", "SQLAlchemy", "PostgreSQL", "Docker", "Railway", "Prometheus", "REST APIs"],
    category: "Backend",
    link: "https://github.com/Lalan03/kasparro-backend-lalan-kumar",
  },
  {
    title: "Portfolio Website",
    description: "Built a production-ready personal portfolio with an admin dashboard for managing contact messages, featuring secure authentication, Cloudflare Turnstile CAPTCHA, real-time analytics tracking, and responsive UI.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "Vercel Analytics."],
    category: "Full-Stack",
    link: "https://github.com/Lalan03/lalan_kumar-portfolio",
  },
  {
    title: "AutoFlow – Visual Workflow Automation Platform",
    description: 
      "Built a visual workflow automation tool with a drag-and-drop interface.",
    tech: ["React", "React Flow", "Node.js", "Express", "MongoDB", "Redis", "BullMQ"],
    category: "Full-Stack",
    link: "https://github.com/Lalan03/autoflow",
  },
  {
    title: "Custom Memory Allocator (Team Project)",
    description:
      "Developed a custom thread-safe memory allocator in C++ with functions xmalloc, xfree,xcalloc, and xrealloc.",
     
    tech: ["C++" ,"Multithreading (std::thread,std::mutex)", "Google Test", "Bash", "Linux"],
    category: "Backend",
    link: "https://github.com/Ranit-cpu/IBM-2025",
  },
  {
    title: "Image Captions Generator (Team Project)",
    description:
      "Developed a web app that generates captions for images using deep learning and computer vision.",
    tech: ["Python", "TensorFlow", "Keras", "NLTK", "NumPy", "Streamlit"],
    category: "AI",
    link: "https://github.com/naazwarda10/images-captions-generator",
  },
  {
    title: "IoT Mood Detector and Perfume Dispenser",
    description:
      "Built an IoT system that detects human emotions using a CNN model and controls a perfume dispenser via Arduino.",
    tech: ["Python", "OpenCV", "TensorFlow", "Arduino", "IoT Hardware"],
    category: "AI",
    link: "https://github.com/Lalan03/IoT_MoodDetector_PerfumeDispenser.git",
  },
  {
    title: "Hospital Management System",
    description: "",
    tech: ["HTML","CSS","JavaScript"],
    category: "Frontend",
    link: "https://github.com/Lalan03/hospital-management-frontend",
  },
];

const filters = ["All", "Frontend", "Backend", "Full-Stack", "AI"] as const;

export default function Projects() {
  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]>("All");

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      id="projects"
      className="scroll-mt-20 py-28 px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-semibold mb-10"
        >
          Projects
        </motion.h2>

        {/* Filters */}
        <div className="flex gap-4 mb-12 flex-wrap">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 text-sm rounded-full border transition
                ${
                  activeFilter === filter
                    ? "bg-white text-black border-white"
                    : "border-zinc-700 text-gray-400 hover:border-white hover:text-white"
                }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="
                block
                border border-zinc-800
                rounded-xl
                p-6
                bg-black
                hover:border-zinc-600
                transition
              "
            >
              <h3 className="text-lg font-semibold mb-2">
                {project.title}
              </h3>

              <p className="text-gray-400 text-sm mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 border border-zinc-700 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
