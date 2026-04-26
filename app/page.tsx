import { CreateNoteForm } from "@/components/CreateNoteForm";

export default function HomePage() {
  return (
    <section className="space-y-4 text-center">
      <h1 className="text-2xl font-bold">온라인 메모 공유 SaaS</h1>
      <p className="text-sm text-slate-600">텍스트를 저장하고 링크로 바로 공유하세요.</p>
      <CreateNoteForm />
    </section>
  );
}
