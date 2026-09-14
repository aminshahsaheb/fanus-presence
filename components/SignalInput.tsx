"use client"
import { useState } from "react"

type Props = { onSubmit: (value: string) => void }

export default function SignalInput({ onSubmit }: Props) {
  const [value, setValue] = useState("Signal: Verify epistemic continuity under witness consensus.")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim()) {
      onSubmit(value)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-3xl space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-[10px] font-mono uppercase tracking-[0.28em] text-zinc-500">
          Input signal
        </label>
        <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-zinc-700">
          witness channel / ready
        </span>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/75 transition-colors focus-within:border-emerald-900/70 focus-within:shadow-[0_0_35px_rgba(87,212,154,0.05)]">
        <div className="absolute left-0 top-0 h-px w-24 bg-emerald-500/30" />
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={4}
          placeholder="Enter signal payload..."
          className="w-full resize-none bg-transparent p-5 text-sm leading-7 text-zinc-200 outline-none placeholder:text-zinc-700 font-mono"
        />
        <div className="border-t border-zinc-800/80 px-4 py-3 sm:px-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setValue("Signal: Verify epistemic continuity under witness consensus.")}
                className="rounded-md border border-zinc-800 bg-zinc-900/70 px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.12em] text-zinc-500 transition-colors hover:border-zinc-700 hover:text-zinc-300"
              >
                Sample 01
              </button>
              <button
                type="button"
                onClick={() => setValue("Signal: Detect flattery/dependency tensor drift across iterations.")}
                className="rounded-md border border-zinc-800 bg-zinc-900/70 px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.12em] text-zinc-500 transition-colors hover:border-zinc-700 hover:text-zinc-300"
              >
                Sample 02
              </button>
            </div>

            <button
              type="submit"
              className="group inline-flex items-center justify-center gap-3 rounded-md border border-emerald-800/70 bg-emerald-950/40 px-5 py-2.5 text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-emerald-300 transition-all hover:border-emerald-600/70 hover:bg-emerald-950/70 hover:shadow-[0_0_24px_rgba(87,212,154,0.12)] active:scale-[0.98]"
            >
              Execute
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
