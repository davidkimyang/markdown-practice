import { notFound } from "next/navigation";

async function getNote(shortId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"}/api/notes/${shortId}`, {
    cache: "no-store",
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("메모를 불러오지 못했습니다.");
  return (await res.json()).note as { content: string; created_at: string; view_count: number };
}

export default async function NotePage({ params }: { params: Promise<{ shortId: string }> }) {
  const { shortId } = await params;
  const note = await getNote(shortId);

  if (!note) notFound();

  return (
    <section className="mx-auto max-w-xl space-y-4 rounded-xl bg-white p-6 shadow">
      <h1 className="text-lg font-semibold">공유 메모</h1>
      <pre className="whitespace-pre-wrap break-words rounded bg-slate-50 p-4">{note.content}</pre>
      <p className="text-xs text-slate-500">
        조회수 {note.view_count} · 생성 {new Date(note.created_at).toLocaleString()}
      </p>
    </section>
  );
}
