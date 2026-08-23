"use client"

import { motion } from "framer-motion"

type Props = {
  confidence: number
  conflict: number
  sealState: string
}

export default function SealPanel({ confidence, conflict, sealState }: Props) {
  const isStable = sealState.toLowerCase() === "stable" || sealState === "SEAL_STABLE"

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto border border-zinc-800 bg-zinc-950/80 rounded-2xl p-6 shadow-2xl space-y-6"
    >
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">🜂</span>
          <h3 className="text-lg font-semibold text-zinc-100">Living Seal Verification</h3>
        </div>
        <span
          className={`px-3 py-1 text-xs font-mono font-bold rounded-full ${
            isStable
              ? "bg-emerald-950/80 text-emerald-400 border border-emerald-800"
              : "bg-amber-950/80 text-amber-400 border border-amber-800"
          }`}
        >
          {sealState.toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-4">
          <div className="text-xs text-zinc-400 font-mono mb-1">Confidence Score</div>
          <div className="text-2xl font-bold font-mono text-emerald-400">
            {(confidence * 100).toFixed(1)}%
          </div>
          <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(confidence * 100, 100)}%` }}
            />
          </div>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-4">
          <div className="text-xs text-zinc-400 font-mono mb-1">Conflict Metric</div>
          <div className="text-2xl font-bold font-mono text-amber-400">
            {(conflict * 100).toFixed(1)}%
          </div>
          <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(conflict * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>

      <div className="text-xs text-zinc-500 font-mono flex items-center justify-between pt-2">
        <span>Witness Consensus: Anchored</span>
        <span>Peymān-ān abadi ast</span>
      </div>
    </motion.div>
  )
}
