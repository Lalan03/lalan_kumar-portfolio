"use client";

import { useEffect, useState } from "react";

type ToastProps = {
  message: string;
  onClose: () => void;
};

export default function Toast({ message, onClose }: ToastProps) {
  const [visible, setVisible] = useState(true);

  // Auto close
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Wait for exit animation before unmount
  useEffect(() => {
    if (!visible) {
      const timer = setTimeout(onClose, 300);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  // ESC key support
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setVisible(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`
        fixed bottom-6 right-6 z-[100]
        flex items-center gap-2
        rounded-md px-4 py-3 text-sm
        backdrop-blur shadow-lg
        border
        transition-all duration-300 ease-out
        ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2"
        }
        bg-green-500/10 border-green-500/30 text-green-400
        dark:bg-green-400/10 dark:border-green-400/30 dark:text-green-300
      `}
    >
      <span aria-hidden>✅</span>
      <span>{message}</span>
    </div>
  );
}
