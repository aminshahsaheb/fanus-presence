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

  useFanusEvents(executionId, (type, payload) => {
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
      case "SEAL_STABLE":
        setActiveNode("SEAL")
        setLanternMode("stable")
        if (payload) {
          setResult(payload)
        }
        break
      case "OUTPUT_READY":
        setActiveNode("OUTPUT")
        setLanternMode("complete")
        setIsExecuting(false)
        if (payload) {
          setResult(payload)
        }
        break
    }
  })

  async function execute(signal: string) {
    try {
      setIsExecuting(true)
      setResult(null)
      setActiveNode("INPUT")
      setLanternMode("processing")
      const res = await fetch("/api/v1/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ signal }),
      })
      const data = await res.json()
      setExecutionId(data.execution_id)
    } catch (error) {
      console.error("Execute error:", error)
      setIsExecuting(false)
      setLanternMode("idle")
    }
  }

  return (
    <main className="min-h-[calc(100vh-60px)] bg-black text-white px-6 py-12 space-y-12 max-w-5xl mx-auto">
      <div className="flex flex-col items-center text-center">
        <Lantern mode={lanternMode} />
        <h1 className="text-5xl font-bold mt-6 tracking-tight text-amber-100">Fanus</h1>
        <p className="text-zinc-400 mt-1 font-serif text-lg">Living Seal • Epistemic Flame</p>
      </div>

      <Pipeline activeNode={activeNode} />

      <SignalInput onSubmit={execute} />

      {result && (
        <SealPanel
          confidence={result.confidence ?? 0.95}
          conflict={result.conflict ?? 0.03}
          sealState={result.seal_state ?? "stable"}
        />
      )}
    </main>
  )
}
