import "./globals.css"
import Link from "next/link"

export const metadata = {
  title: "Fanus – Living Seal",
  description: "Living Seal & Āyāneh Presence Dashboard for Fanus Protocol",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen flex flex-col font-sans">
        <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-50 px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl text-amber-400">🜂</span>
            <span className="font-semibold tracking-wider text-amber-100 uppercase text-sm">
              Fanus Protocol
            </span>
          </div>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link
              href="/"
              className="text-zinc-300 hover:text-amber-400 transition-colors"
            >
              Living Seal Pipeline
            </Link>
            <Link
              href="/presence"
              className="text-zinc-300 hover:text-amber-400 transition-colors"
            >
              Āyāneh Presence
            </Link>
          </nav>
        </header>
        <div className="flex-1">{children}</div>
      </body>
    </html>
  )
}
