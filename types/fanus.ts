export interface FanusResponse {
  input: string
  output: string
  confidence: number
  conflict: number
  seal_state: "stable" | "warning" | "critical"
  reasoning_depth: number
}

export type SealEvent = {
  type: string
  payload: any
}

export type ExecutionState = {
  id: string
  status: string
  activeNode: string
  lanternMode: string
  result?: any
}
