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
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
      <label className="block text-xs uppercase tracking-widest text-zinc-400 font-mono">
        Input Signal
      </label>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={3}
        placeholder="Enter signal payload..."
        className="w-full bg-zinc-950 border border-zinc-800 text-zinc-100 rounded-xl p-4 focus:outline-none focus:border-amber-400/80 transition-colors text-sm font-mono"
      />
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setValue("Signal: Verify epistemic continuity under witness consensus.")}
            className="text-xs bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 px-3 py-1.5 rounded-md border border-zinc-800 transition-colors"
          >
            Sample 1
          </button>
          <button
            type="button"
            onClick={() => setValue("Signal: Detect flattery/dependency tensor drift across iterations.")}
            className="text-xs bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 px-3 py-1.5 rounded-md border border-zinc-800 transition-colors"
          >
            Sample 2
          </button>
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-sm rounded-lg transition-all shadow-lg shadow-amber-500/20 active:scale-95"
        >
          Execute Pipeline
        </button>
      </div>
    </form>
  )
}
