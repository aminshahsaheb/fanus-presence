"use client"

import { motion } from "framer-motion"

type Props = {
  confidence: number
  conflict: number
  sealState: string
}

export default function SealPanel({ confidence, conflict, sealState }: Props) {
  const normalizedState = sealState.toLowerCase()
  const isStable = normalizedState === "stable" || sealState === "SEAL_STABLE"
  const isCritical = normalizedState === "critical" || sealState === "SEAL_CRITICAL"
  const stateColor = isCritical ? "#dc4f4f" : isStable ? "#57d49a" : "#d9a441"

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto w-full max-w-3xl overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-950/70 shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
    >
      <div className="flex flex-col gap-4 border-b border-zinc-800/80 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-zinc-600">Verification result</div>
          <h3 className="mt-1 text-base font-medium tracking-wide text-zinc-100">Living Seal</h3>
        </div>
        <div className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: stateColor, boxShadow: `0 0 12px ${stateColor}` }} />
          <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.2em]" style={{ color: stateColor }}>
            {sealState}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 divide-y divide-zinc-800/80 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
        <Metric label="Confidence" value={`${(confidence * 100).toFixed(1)}%`} ratio={confidence} color="#57d49a" />
        <Metric label="Conflict" value={`${(conflict * 100).toFixed(1)}%`} ratio={conflict} color="#d9a441" />
      </div>

      <div className="flex flex-col gap-2 border-t border-zinc-800/80 px-5 py-4 text-[9px] font-mono uppercase tracking-[0.16em] text-zinc-600 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <span>Witness consensus / anchored</span>
        <span>Peymān-ān abadi ast</span>
      </div>
    </motion.section>
  )
}

function Metric({ label, value, ratio, color }: { label: string; value: string; ratio: number; color: string }) {
  return (
    <div className="p-5 sm:p-6">
      <div className="flex items-end justify-between gap-4">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-600">{label}</span>
        <span className="text-2xl font-mono font-medium" style={{ color }}>{value}</span>
      </div>
      <div className="mt-4 h-px overflow-hidden bg-zinc-800">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(Math.max(ratio, 0) * 100, 100)}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full"
          style={{ background: color }}
        />
      </div>
    </div>
  )
}
