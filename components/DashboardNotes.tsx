"use client";

import { useEffect, useState } from "react";
import type { Note } from "@/lib/types";

export function DashboardNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const res = await fetch("/api/me/notes", { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      setNotes(data.notes ?? []);
    }
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  async function remove(shortId: string) {
    await fetch(`/api/notes/${shortId}`, { method: "DELETE" });
    await load();
  }

  async function update(shortId: string, content: string) {
    await fetch(`/api/notes/${shortId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    await load();
  }

  if (loading) return <p>로딩 중...</p>;

  return (
    <div className="space-y-3">
      {notes.map((note) => (
        <article key={note.id} className="rounded-lg border bg-white p-4">
          <textarea
            className="w-full rounded border p-2"
            defaultValue={note.content}
            onBlur={(e) => void update(note.short_id, e.target.value)}
          />
          <div className="mt-2 flex items-center justify-between text-sm">
            <a className="text-blue-600" href={`/n/${note.short_id}`}>
              /n/{note.short_id}
            </a>
            <button onClick={() => void remove(note.short_id)} className="rounded bg-red-600 px-2 py-1 text-white">
              삭제
            </button>
          </div>
        </article>
      ))}
      {!notes.length && <p className="text-sm text-slate-500">작성한 메모가 없습니다.</p>}
    </div>
  );
}
