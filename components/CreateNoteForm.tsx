"use client";

import { useState } from "react";

export function CreateNoteForm() {
  const [content, setContent] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [expiresAt, setExpiresAt] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setResultUrl("");

    const res = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, isPrivate, expiresAt: expiresAt || null }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "저장에 실패했습니다.");
      return;
    }

    setResultUrl(`${window.location.origin}/n/${data.shortId}`);
    setContent("");
  }

  async function copy() {
    await navigator.clipboard.writeText(resultUrl);
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto flex max-w-xl flex-col gap-3 rounded-xl bg-white p-5 shadow">
      <textarea
        className="min-h-52 rounded-lg border p-3"
        placeholder="메모를 입력하세요..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        maxLength={5000}
      />

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={isPrivate} onChange={(e) => setIsPrivate(e.target.checked)} />
        비공개 메모(Pro)
      </label>

      <input
        type="datetime-local"
        className="rounded-lg border p-2 text-sm"
        value={expiresAt}
        onChange={(e) => setExpiresAt(e.target.value)}
      />

      <button className="rounded-lg bg-black px-4 py-2 text-white">저장하고 링크 생성</button>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {resultUrl && (
        <div className="rounded-lg border bg-slate-50 p-3 text-sm">
          <p className="break-all">{resultUrl}</p>
          <button type="button" onClick={copy} className="mt-2 rounded bg-slate-800 px-3 py-1 text-white">
            링크 복사
          </button>
        </div>
      )}
    </form>
  );
}
