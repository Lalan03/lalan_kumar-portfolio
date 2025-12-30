"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const submit = async () => {
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!res.ok) {
      setError("Invalid password");
      return;
    }

    router.push("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-sm p-6 border border-zinc-800 rounded-lg">
        <h1 className="text-2xl font-semibold mb-4">Admin Login</h1>

        <input
          type="password"
          placeholder="Admin password"
          className="w-full p-3 mb-4 bg-zinc-900 border border-zinc-800"
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-400 mb-3">{error}</p>}

        <button
          onClick={submit}
          className="w-full py-3 bg-white text-black font-medium"
        >
          Login
        </button>
      </div>
    </div>
  );
}
