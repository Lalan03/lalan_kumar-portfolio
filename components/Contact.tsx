"use client";

import { useEffect, useRef, useState } from "react";
import Toast from "@/components/Toast";

declare global {
  interface Window {
    turnstile?: {
      render: (
        element: HTMLElement,
        options: {
          sitekey: string | undefined;
          callback: (token: string) => void;
        }
      ) => string;
      reset: (widgetId: string) => void;
    };
  }
}

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [token, setToken] = useState<string | null>(null);
  const [widgetId, setWidgetId] = useState<string | null>(null);
  const captchaRef = useRef<HTMLDivElement>(null);
  const renderedRef = useRef(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState(false);

  /* =========================
     Render Turnstile once
  ========================== */
  useEffect(() => {
    if (!captchaRef.current || renderedRef.current) return;

    const interval = setInterval(() => {
      if (window.turnstile && captchaRef.current) {
        const id = window.turnstile.render(captchaRef.current, {
          sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
          callback: (t: string) => setToken(t),
        });

        setWidgetId(id);
        renderedRef.current = true;
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  const validateForm = () => {
    if (!form.name || !form.email || !form.message) {
      return "All fields are required";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      return "Please enter a valid email address";
    }

    if (form.message.length > 1000) {
      return "Message is too long";
    }

    if (!token) {
      return "Please complete the captcha";
    }

    return null;
  };

  const submit = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, token }),
      });

      if (!res.ok) throw new Error("Request failed");

      // Reset
      setForm({ name: "", email: "", message: "" });
      setToken(null);
      setToast(true);

      if (widgetId && window.turnstile) {
        window.turnstile.reset(widgetId);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="scroll-mt-24 py-32 px-6 max-w-5xl mx-auto"
    >
      <h2 className="text-3xl font-semibold mb-6">Contact</h2>

      <input
        placeholder="Name"
        value={form.name}
        className="block w-full p-3 mb-4 bg-zinc-900 border border-zinc-800"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Email"
        value={form.email}
        className="block w-full p-3 mb-4 bg-zinc-900 border border-zinc-800"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <textarea
        placeholder="Message"
        value={form.message}
        rows={4}
        className="block w-full p-3 mb-4 bg-zinc-900 border border-zinc-800"
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />

      {/* CAPTCHA */}
      <div className="mt-6 mb-8">
        <div ref={captchaRef} />
      </div>


      {/* ERROR */}
      {error && (
        <p className="mb-4 text-sm text-red-400">{error}</p>
      )}

    <button
  onClick={submit}
  disabled={loading || !token}
  aria-busy={loading}
  className={`
    mt-2
    px-6 py-3
    font-medium
    flex items-center justify-center gap-2
    transition
    ${
      loading || !token
        ? "bg-gray-400 text-black dark:bg-zinc-700 dark:text-white cursor-not-allowed"
        : "bg-white text-black hover:bg-gray-100 dark:bg-zinc-100 dark:text-black"
    }
  `}
>
  {loading && <span className="spinner" />}
  <span className={loading ? "opacity-70" : ""}>
    {loading ? "Sending..." : "Send Message"}
  </span>
</button>




      {/* TOAST */}
      {toast && (
        <Toast
          message="Message sent successfully. I’ll get back to you soon."
          onClose={() => setToast(false)}
        />
      )}
    </section>
  );
}
