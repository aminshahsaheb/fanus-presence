import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const signal = body.signal || "default_signal";
    const execution_id = `exec_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const groqApiKey = process.env.GROQ_API_KEY;

    let evaluation = null;

    if (groqApiKey && signal.trim().length > 0) {
      try {
        const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${groqApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
              {
                role: "system",
                content: "You are the Fanus Epistemic Signal Evaluator. Assess if the signal creates an external side effect or only an in-memory observation event. Output JSON: {\"confidence\": number (0-1), \"conflict\": number (0-1), \"seal_state\": \"stable\" | \"warning\" | \"critical\", \"epistemic_reach\": \"internal\" | \"external\", \"side_effect\": boolean, \"summary\": string}"
              },
              {
                role: "user",
                content: `Signal: ${signal}`
              }
            ],
            response_format: { type: "json_object" },
            temperature: 0.1,
            max_tokens: 150,
          }),
        });

        if (groqRes.ok) {
          const groqData = await groqRes.json();
          const raw = groqData.choices?.[0]?.message?.content;
          if (raw) {
            evaluation = JSON.parse(raw);
          }
        }
      } catch (err) {
        console.warn("Groq signal evaluation failed, falling back to local protocol:", err);
      }
    }

    return NextResponse.json({
      execution_id,
      status: "queued",
      signal_length: signal.length,
      action: "FanusExecutionLayer.execute()",
      reach: evaluation?.epistemic_reach || "internal",
      side_effect: Boolean(evaluation?.side_effect),
      uncertainty_note: evaluation?.summary || "تنها در حافظه موقت رویداد ثبت شد؛ بدون اثر جانبی در جهان بیرونی.",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to initialize execution" },
      { status: 500 }
    );
  }
}
