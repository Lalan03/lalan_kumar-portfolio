"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="
        text-sm
        px-3 py-1.5
        rounded-md
        border border-zinc-300 dark:border-zinc-700
        hover:bg-zinc-100 dark:hover:bg-zinc-800
        transition
      "
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
