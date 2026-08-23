"use client"

const nodes = ["INPUT", "RFC", "SEAL", "OUTPUT"]

export default function Pipeline({ activeNode }: { activeNode: string }) {
  return (
    <div className="flex items-center justify-center space-x-4 max-w-2xl mx-auto py-2">
      {nodes.map((node, i) => {
        const isActive = node === activeNode
        return (
          <div key={node} className="flex items-center space-x-4">
            <div
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all duration-300 ${
                isActive
                  ? "bg-amber-400 text-black shadow-lg shadow-amber-500/20 scale-105"
                  : "bg-zinc-900 text-zinc-400 border border-zinc-800"
              }`}
            >
              {node}
            </div>
            {i < nodes.length - 1 && (
              <span className={`text-sm ${isActive ? "text-amber-400" : "text-zinc-700"}`}>
                →
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}
