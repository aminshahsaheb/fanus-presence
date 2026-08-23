"use client"

import { motion } from "framer-motion"

export type LanternMode = "idle" | "processing" | "conflict" | "warning" | "critical" | "stable" | "complete"

type Props = { mode: LanternMode }

const colors: Record<LanternMode, string> = {
  idle: "#f59e0b",
  processing: "#3b82f6",
  conflict: "#ef4444",
  warning: "#f97316",
  critical: "#dc2626",
  stable: "#10b981",
  complete: "#06b6d4",
}

export default function Lantern({ mode }: Props) {
  const color = colors[mode] || "#f59e0b"

  return (
    <div className="flex flex-col items-center">
      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.75, 1, 0.75],
          filter: [
            `drop-shadow(0 0 20px ${color})`,
            `drop-shadow(0 0 45px ${color})`,
            `drop-shadow(0 0 20px ${color})`,
          ],
        }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        className="text-8xl select-none"
        style={{ color }}
      >
        🜂
      </motion.div>
      <div className="mt-3 text-xs font-mono tracking-widest uppercase text-zinc-400">
        Flame State: <span style={{ color }} className="font-bold">{mode}</span>
      </div>
    </div>
  )
}
