export default function PricingPage() {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      <article className="rounded-xl border bg-white p-6">
        <h2 className="text-lg font-bold">Free</h2>
        <ul className="mt-3 list-disc space-y-1 pl-4 text-sm">
          <li>하루 10개 메모</li>
          <li>공개 메모</li>
        </ul>
      </article>
      <article className="rounded-xl border-2 border-black bg-white p-6">
        <h2 className="text-lg font-bold">Pro</h2>
        <ul className="mt-3 list-disc space-y-1 pl-4 text-sm">
          <li>무제한 메모</li>
          <li>만료일 설정</li>
          <li>비공개 메모</li>
        </ul>
      </article>
    </section>
  );
}
