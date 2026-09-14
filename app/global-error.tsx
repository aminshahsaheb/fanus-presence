'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className="bg-[#030504] text-zinc-200 flex flex-col items-center justify-center min-h-screen p-6 text-center">
        <div className="text-6xl text-emerald-400 mb-4 font-serif">⚠️</div>
        <h2 className="text-3xl font-serif text-zinc-100 mb-2">خطای سیستمی رخ داده است</h2>
        <p className="text-zinc-400 mb-8 max-w-md">شعله در حال بازیابی ارتباط است.</p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-emerald-950/40 hover:bg-emerald-950/70 border border-emerald-800/70 rounded-xl text-emerald-300 transition-colors"
        >
          راه‌اندازی مجدد
        </button>
      </body>
    </html>
  );
}
