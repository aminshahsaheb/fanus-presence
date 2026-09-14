import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const signal = typeof body.signal === "string" ? body.signal.trim() : "";
    if (!signal) {
      return NextResponse.json({ error: "Signal is required" }, { status: 400 });
    }
    if (signal.length > 4000) {
      return NextResponse.json({ error: "Signal is too long (max 4000 characters)" }, { status: 413 });
    }

    const execution_id = `exec_${Date.now()}_${crypto.randomUUID().slice(0, 8)}`;
    const engineUrl = process.env.NEXT_PUBLIC_ENGINE_URL;

    // Primary source: the real Fanus engine's /verify endpoint.
    if (engineUrl) {
      try {
        const res = await fetch(engineUrl + "/demo/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: "signal_check", response: signal, context: "" }),
          signal: AbortSignal.timeout(6000),
        });
        if (res.ok) {
          const real = await res.json();
          return NextResponse.json({
            execution_id,
            status: "evaluated",
            signal_length: signal.length,
            action: "FanusExecutionLayer.execute()",
            reach: "external",
            side_effect: false,
            uncertainty_note:
              `ارزیابی واقعی موتور: risk=${real.risk}, truth_score=${real.truth_score}.`,
            verification: real,
            timestamp: new Date().toISOString()
          }, { headers: { "Cache-Control": "no-store" } });
        }
      } catch (err) {
        console.warn("Real engine unreachable for /execute, falling back:", err);
      }
    }

    // Fallback: engine unreachable -- report that honestly, without fabricating a score.
    return NextResponse.json({
      execution_id,
      status: "engine_unavailable",
      signal_length: signal.length,
      action: "FanusExecutionLayer.execute()",
      reach: "internal",
      side_effect: false,
      uncertainty_note: "موتور واقعی در دسترس نیست؛ هیچ verification score یا execution persistence ادعا نمی‌شود.",
      timestamp: new Date().toISOString()
    }, { status: 503, headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to initialize execution" },
      { status: 500 }
    );
  }
}
