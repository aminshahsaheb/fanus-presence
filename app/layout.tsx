import "./globals.css"
import Link from "next/link"

export const metadata = {
  title: "Fānus — Living Seal",
  description: "Fānus Presence — a live human–AI presence and verification interface.",
  applicationName: "Fānus Presence",
  keywords: ["Fānus", "Presence", "Living Seal", "Witness", "verification"],
  metadataBase: new URL("https://fanus-presence.vercel.app"),
  openGraph: {
    title: "Fānus — Living Seal",
    description: "A live human–AI presence and verification interface.",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="min-h-screen bg-[#030504] font-sans text-white">
        <header className="sticky top-0 z-50 border-b border-zinc-900/90 bg-[#030504]/88 px-5 py-3 backdrop-blur-xl sm:px-8">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-6">
            <Link href="/" className="group flex items-center gap-3">
              <span className="relative flex h-7 w-7 items-center justify-center rounded-full border border-emerald-900/70 bg-emerald-950/20">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(87,212,154,0.7)] transition-shadow group-hover:shadow-[0_0_16px_rgba(87,212,154,0.9)]" />
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-zinc-300">Fanus</span>
            </Link>

            <nav className="flex items-center gap-5 text-[9px] font-mono uppercase tracking-[0.16em] sm:gap-7">
              <Link href="/" className="text-zinc-500 transition-colors hover:text-emerald-300">
                Living Seal
              </Link>
              <Link href="/presence" className="text-zinc-500 transition-colors hover:text-emerald-300">
                Āyāneh Presence
              </Link>
            </nav>
          </div>
        </header>
        <div className="flex-1">{children}</div>
      </body>
    </html>
  )
}
