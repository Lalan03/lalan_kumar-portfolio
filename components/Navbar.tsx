"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("hero");
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  /* ================================
     Active section detection
  ================================= */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    links.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* ================================
     Hide navbar on scroll down
  ================================= */
  useEffect(() => {
    let lastScroll = 0;

    const onScroll = () => {
      const current = window.scrollY;
      setHidden(current > lastScroll && current > 100);
      lastScroll = current;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50
        bg-white/80 dark:bg-black/80 backdrop-blur
        border-b border-zinc-200 dark:border-zinc-800
        transition-transform duration-300
        ${hidden ? "-translate-y-full" : "translate-y-0"}
      `}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* LOGO */}
        <a href="#hero" className="font-semibold">
          Lalan
        </a>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center space-x-6 text-sm">
          {links.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`relative pb-1 transition focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white ${
                active === id
                  ? "text-black dark:text-white after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-black dark:after:bg-white"
                  : "text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
              }`}
            >
              {label}
            </a>
          ))}

          {/* THEME TOGGLE (DESKTOP) */}
          <ThemeToggle />
        </div>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="md:hidden text-xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`
          md:hidden absolute top-16 left-0 w-full
          bg-white dark:bg-black
          border-b border-zinc-200 dark:border-zinc-800
          shadow-lg
          transition-all duration-300 ease-out
          ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}
        `}
      >
        <div className="px-6 py-6 space-y-5 text-sm">
          {links.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setOpen(false)}
              className={`block focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white ${
                active === id
                  ? "text-black dark:text-white font-medium"
                  : "text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
              }`}
            >
              {label}
            </a>
          ))}

          {/* THEME TOGGLE (MOBILE) */}
          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
