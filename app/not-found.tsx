import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 flex flex-col items-center justify-center p-6 text-center">
      <div className="text-6xl text-amber-500 mb-4 font-serif">🜁</div>
      <h2 className="text-3xl font-serif text-amber-100 mb-2">صفحه یافت نشد — 404</h2>
      <p className="text-zinc-400 mb-8 max-w-md">مسیر درخواستی در سامانه فانوس و مهر زنده وجود ندارد.</p>
      <Link
        href="/"
        className="px-6 py-3 bg-amber-600/30 hover:bg-amber-600/50 border border-amber-500/40 rounded-xl text-amber-200 transition-colors"
      >
        بازگشت به صفحه اصلی
      </Link>
    </div>
  );
}
