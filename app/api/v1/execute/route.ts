import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const signal = body.signal || "default_signal";
    const execution_id = `exec_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
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
          });
        }
      } catch (err) {
        console.warn("Real engine unreachable for /execute, falling back:", err);
      }
    }

    // Fallback: engine unreachable -- report that honestly, without fabricating a score.
    return NextResponse.json({
      execution_id,
      status: "queued",
      signal_length: signal.length,
      action: "FanusExecutionLayer.execute()",
      reach: "internal",
      side_effect: false,
      uncertainty_note: "موتور واقعی در دسترس نیست؛ تنها در حافظه موقت رویداد ثبت شد.",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to initialize execution" },
      { status: 500 }
    );
  }
}
