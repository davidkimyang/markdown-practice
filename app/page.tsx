import Image from "next/image";
import { BoardSection } from "@/components/BoardSection";
import { gallery, quotes, timeline } from "@/lib/mj-data";

export default function HomePage() {
  return (
    <div className="space-y-14">
      <section className="rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 to-slate-800 p-8">
        <p className="text-sm uppercase tracking-[0.2em] text-rose-400">Jordan Legacy</p>
        <h1 className="mt-2 text-4xl font-black">Fly Like 23</h1>
        <p className="mt-3 max-w-2xl text-slate-300">명장면, 명언, 커리어 타임라인, 그리고 팬 자유게시판을 한곳에서 즐기는 마이클 조던 SNS형 아카이브.</p>
      </section>

      <section id="timeline" className="space-y-4">
        <h2 className="text-2xl font-bold">Career Timeline</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {timeline.map((item) => (
            <article key={item.year} className="rounded-xl border border-slate-700 bg-slate-900 p-4">
              <p className="text-rose-400">{item.year}</p>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-slate-300">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="gallery" className="space-y-4">
        <h2 className="text-2xl font-bold">Gallery</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((image) => (
            <figure key={image.src} className="overflow-hidden rounded-xl border border-slate-700 bg-slate-900">
              <Image src={image.src} alt={image.alt} width={420} height={280} className="h-52 w-full object-cover" />
            </figure>
          ))}
        </div>
      </section>

      <section id="quotes" className="space-y-4">
        <h2 className="text-2xl font-bold">Quotes</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {quotes.map((quote) => (
            <blockquote key={quote} className="rounded-xl border border-slate-700 bg-slate-900 p-4 text-sm text-slate-200">
              “{quote}”
            </blockquote>
          ))}
        </div>
      </section>

      <BoardSection />
    </div>
  );
}
