"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const supabase = createSupabaseBrowserClient();

    const action =
      mode === "login"
        ? supabase.auth.signInWithPassword({ email, password })
        : supabase.auth.signUp({ email, password });

    const { error } = await action;
    if (error) return setError(error.message);

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="mx-auto flex max-w-sm flex-col gap-3 rounded-lg bg-white p-5 shadow">
      <input className="rounded border p-2" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        className="rounded border p-2"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="rounded bg-black py-2 text-white">{mode === "login" ? "로그인" : "회원가입"}</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  );
}
