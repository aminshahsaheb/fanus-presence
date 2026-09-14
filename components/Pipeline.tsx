"use client"

const nodes = ["INPUT", "RFC", "SEAL", "OUTPUT"]

export default function Pipeline({ activeNode }: { activeNode: string }) {
  return (
    <div className="mx-auto w-full max-w-3xl py-2">
      <div className="mb-3 flex items-center justify-between px-1 text-[9px] font-mono uppercase tracking-[0.28em] text-zinc-600">
        <span>Execution path</span>
        <span>Live state</span>
      </div>

      <div className="relative flex items-center justify-between rounded-xl border border-zinc-800/80 bg-zinc-950/55 px-3 py-4 sm:px-6">
        <div className="absolute left-8 right-8 top-1/2 h-px -translate-y-1/2 bg-zinc-800 sm:left-12 sm:right-12" />

        {nodes.map((node, i) => {
          const isActive = node === activeNode
          const hasPassed = nodes.indexOf(activeNode) > i

          return (
            <div key={node} className="relative z-10 flex items-center">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`relative flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-500 ${
                    isActive
                      ? "border-emerald-300/70 bg-emerald-950/80 shadow-[0_0_24px_rgba(87,212,154,0.18)]"
                      : hasPassed
                        ? "border-emerald-900/70 bg-emerald-950/30"
                        : "border-zinc-700 bg-zinc-950"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full transition-all duration-500 ${
                      isActive ? "bg-emerald-300 shadow-[0_0_12px_rgba(87,212,154,0.9)]" : hasPassed ? "bg-emerald-700" : "bg-zinc-700"
                    }`}
                  />
                </div>
                <span
                  className={`text-[9px] font-mono tracking-[0.18em] transition-colors duration-300 sm:text-[10px] ${
                    isActive ? "text-emerald-300" : hasPassed ? "text-emerald-700" : "text-zinc-600"
                  }`}
                >
                  {node}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
