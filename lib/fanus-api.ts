export async function executeFanus(signal: string) {
  const res = await fetch("/api/v1/execute", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ signal }),
  })
  return res.json()
}
