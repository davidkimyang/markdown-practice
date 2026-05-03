import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <header className="border-b border-slate-800 bg-slate-950/95 backdrop-blur">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 text-sm">
            <Link href="/" className="text-lg font-black tracking-wide text-rose-400">
              Jordan Legacy
            </Link>
            <div className="flex gap-4 text-slate-300">
              <a href="#timeline">Timeline</a>
              <a href="#gallery">Gallery</a>
              <a href="#quotes">Quotes</a>
              <a href="#board">Free Board</a>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
