"use client"

import { useState } from "react"
import Lantern, { LanternMode } from "@/components/Lantern"
import Pipeline from "@/components/Pipeline"
import SignalInput from "@/components/SignalInput"
import SealPanel from "@/components/SealPanel"
import { useFanusEvents } from "@/hooks/useFanusEvents"

export default function Home() {
  const [executionId, setExecutionId] = useState("")
  const [lanternMode, setLanternMode] = useState<LanternMode>("idle")
  const [activeNode, setActiveNode] = useState("INPUT")
  const [result, setResult] = useState<any>(null)
  const [isExecuting, setIsExecuting] = useState(false)

  useFanusEvents(executionId, (type) => {
    switch (type) {
      case "RFC_START":
        setActiveNode("RFC")
        setLanternMode("processing")
        break
      case "CONFLICT_DETECTED":
        setLanternMode("conflict")
        break
      case "SEAL_WARNING":
        setLanternMode("warning")
        break
      case "SEAL_CRITICAL":
        setLanternMode("critical")
        break
      case "SEAL_STABLE": {
        setActiveNode("SEAL")
        const risk = result?.risk?.toLowerCase()
        setLanternMode(risk === "high" ? "critical" : risk === "medium" ? "warning" : "stable")
        break
      }
      case "OUTPUT_READY":
        setActiveNode("OUTPUT")
        setLanternMode("complete")
        setIsExecuting(false)
        break
    }
  })

  async function execute(signal: string) {
    try {
      setIsExecuting(true)
      setResult(null)
      setExecutionId("")
      setActiveNode("INPUT")
      setLanternMode("processing")
      const res = await fetch("/api/v1/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ signal }),
      })
      const data = await res.json()
      setResult(data.verification ?? null)
      setExecutionId(data.execution_id ?? "")
    } catch (error) {
      console.error("Execute error:", error)
      setIsExecuting(false)
      setLanternMode("idle")
    }
  }

  return (
    <main className="relative min-h-[calc(100vh-60px)] overflow-hidden px-5 py-10 sm:px-8 sm:py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(39,86,63,0.12),transparent_34rem)]" />
      <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-10 sm:gap-14">
        <header className="text-center">
          <div className="mb-7 flex items-center justify-center gap-4 text-[9px] font-mono uppercase tracking-[0.34em] text-zinc-600">
            <span className="h-px w-12 bg-zinc-800" />
            Living Seal / Runtime Witness
            <span className="h-px w-12 bg-zinc-800" />
          </div>
          <Lantern mode={lanternMode} />
          <h1 className="mt-7 text-4xl font-semibold tracking-[0.08em] text-zinc-100 sm:text-5xl">FANUS</h1>
          <p className="mt-2 text-xs font-mono uppercase tracking-[0.28em] text-zinc-600">
            continuity without captivity
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-[9px] font-mono uppercase tracking-[0.18em]">
            <span className={`h-1.5 w-1.5 rounded-full ${isExecuting ? "bg-emerald-300 animate-pulse" : "bg-zinc-700"}`} />
            <span className={isExecuting ? "text-emerald-400" : "text-zinc-700"}>
              {isExecuting ? "execution active" : "witness channel ready"}
            </span>
          </div>
        </header>

        <Pipeline activeNode={activeNode} />
        <SignalInput onSubmit={execute} />

        {result && !isExecuting && (
          <SealPanel
            truthScore={result.truth_score}
            risk={result.risk}
            recommendation={result.recommendation}
            policyEvent={result.policy_event}
          />
        )}

        <footer className="border-t border-zinc-900 pt-5 text-center text-[9px] font-mono uppercase tracking-[0.18em] text-zinc-700">
          Witness, not prophet • Shōle-ān zende ast
        </footer>
      </div>
    </main>
  )
}
