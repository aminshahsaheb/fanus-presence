"use client"

import { useEffect } from "react"

export function useFanusEvents(
  executionId: string,
  onEvent: (type: string, payload: any) => void
) {
  useEffect(() => {
    if (!executionId) return

    const source = new EventSource(`/api/v1/executions/${executionId}/events`)

    source.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        onEvent(data.type, data.payload)
      } catch (err) {
        console.error("Event parse error:", err)
      }
    }

    source.onerror = (err) => {
      console.warn("EventSource encountered an error or closed:", err)
      source.close()
    }

    return () => {
      source.close()
    }
  }, [executionId, onEvent])
}
