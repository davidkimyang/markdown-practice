import { DashboardNotes } from "@/components/DashboardNotes";

export default function DashboardPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-xl font-semibold">내 메모 관리</h1>
      <DashboardNotes />
    </section>
  );
}
