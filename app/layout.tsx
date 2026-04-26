import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <header className="border-b bg-white">
          <nav className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3 text-sm">
            <Link href="/" className="font-semibold">
              MemoSaaS
            </Link>
            <div className="flex gap-4">
              <Link href="/dashboard">대시보드</Link>
              <Link href="/pricing">요금제</Link>
              <Link href="/login">로그인</Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-3xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
