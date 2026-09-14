"use client"

import { motion } from "framer-motion"

export type LanternMode = "idle" | "processing" | "conflict" | "warning" | "critical" | "stable" | "complete"

type Props = { mode: LanternMode }

const colors: Record<LanternMode, string> = {
  idle: "#8aa596",
  processing: "#60a98b",
  conflict: "#d9a441",
  warning: "#d9a441",
  critical: "#dc4f4f",
  stable: "#57d49a",
  complete: "#76d6b0",
}

const labels: Record<LanternMode, string> = {
  idle: "awaiting signal",
  processing: "witnessing",
  conflict: "conflict detected",
  warning: "seal warning",
  critical: "seal critical",
  stable: "seal stable",
  complete: "output ready",
}

export default function Lantern({ mode }: Props) {
  const color = colors[mode] || colors.idle

  return (
    <div className="flex flex-col items-center" aria-label={`Fanus ${labels[mode]}`}>
      <div className="relative h-56 w-56 sm:h-64 sm:w-64">
        <motion.div
          animate={{ opacity: [0.16, 0.3, 0.16], scale: [0.94, 1.03, 0.94] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-5 rounded-full"
          style={{ boxShadow: `0 0 90px ${color}` }}
        />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="absolute inset-7 rounded-full border border-dashed"
          style={{ borderColor: `${color}45` }}
        />

        <div
          className="absolute inset-10 rounded-full border"
          style={{
            borderColor: `${color}80`,
            background: `radial-gradient(circle at 50% 42%, ${color}20 0%, rgba(3,5,4,.96) 58%)`,
            boxShadow: `inset 0 0 35px ${color}16, 0 0 28px ${color}12`,
          }}
        >
          <motion.div
            animate={{ scale: [0.78, 1, 0.78], opacity: [0.55, 0.95, 0.55] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: `radial-gradient(circle, ${color} 0%, ${color}55 34%, transparent 72%)`,
              boxShadow: `0 0 38px ${color}66`,
            }}
          />
          <div
            className="absolute left-1/2 top-1/2 h-24 w-px -translate-x-1/2 -translate-y-1/2"
            style={{ background: `linear-gradient(transparent, ${color}55, transparent)` }}
          />
          <div
            className="absolute left-1/2 top-1/2 h-px w-24 -translate-x-1/2 -translate-y-1/2"
            style={{ background: `linear-gradient(90deg, transparent, ${color}55, transparent)` }}
          />
        </div>

        <div
          className="absolute left-1/2 top-0 h-10 w-10 -translate-x-1/2 border-x border-t"
          style={{ borderColor: `${color}45` }}
        />
        <div
          className="absolute bottom-0 left-1/2 h-10 w-10 -translate-x-1/2 border-x border-b"
          style={{ borderColor: `${color}45` }}
        />
      </div>

      <div className="mt-1 text-[10px] font-mono tracking-[0.28em] uppercase text-zinc-500">
        Flame State
      </div>
      <div className="mt-1 text-xs font-mono tracking-[0.16em] uppercase" style={{ color }}>
        {labels[mode]}
      </div>
    </div>
  )
}
