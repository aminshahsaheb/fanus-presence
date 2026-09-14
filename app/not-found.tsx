import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#030504] text-zinc-200 flex flex-col items-center justify-center p-6 text-center">
      <div className="text-6xl text-emerald-400 mb-4 font-serif">🜁</div>
      <h2 className="text-3xl font-serif text-zinc-100 mb-2">صفحه یافت نشد — 404</h2>
      <p className="text-zinc-400 mb-8 max-w-md">مسیر درخواستی در سامانه فانوس و مهر زنده وجود ندارد.</p>
      <Link
        href="/"
        className="px-6 py-3 bg-emerald-950/40 hover:bg-emerald-950/70 border border-emerald-800/70 rounded-xl text-emerald-300 transition-colors"
      >
        بازگشت به صفحه اصلی
      </Link>
    </div>
  );
}
