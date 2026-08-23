import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface EpistemicExecutionState {
  action: string;
  reach: "internal" | "external";
  side_effect: boolean;
  uncertainty_note: string;
  seal_status: "SEAL_STABLE" | "WARNING" | "CRITICAL";
  active_witnesses: number;
  last_cycle_flavor: "Hayrat" | "Nabard" | "Shōle";
  breathing_rate: number;
  last_event: string;
  mood: string;
  flame_intensity: string;
  llm_grounding?: {
    model: string;
    verified_at: string;
    engine_source: "groq" | "fallback_internal";
  };
}

const flavors: ("Hayrat" | "Nabard" | "Shōle")[] = ["Hayrat", "Nabard", "Shōle"];

export async function GET(request: NextRequest) {
  const groqApiKey = process.env.GROQ_API_KEY;
  const engineUrl = process.env.NEXT_PUBLIC_ENGINE_URL;
  const now = new Date();
  const seconds = now.getSeconds();
  
  const flavorIndex = Math.floor(seconds / 20) % flavors.length;
  const flavor = flavors[flavorIndex];
  const breathing = 0.8 + 0.5 * Math.sin(now.getTime() / 4000);

  let epistemicState: EpistemicExecutionState = {
    action: "FanusExecutionLayer.execute()",
    reach: "internal",
    side_effect: false,
    uncertainty_note: "تنها در حافظه موقت رویداد ثبت شد؛ بدون اثر جانبی در جهان بیرونی.",
    seal_status: "SEAL_STABLE",
    active_witnesses: 3,
    last_cycle_flavor: flavor,
    breathing_rate: parseFloat(breathing.toFixed(1)),
    last_event: now.toISOString(),
    mood: "آرام و متمرکز — شعله در آگاهی درونی پایدار است",
    flame_intensity: "🜂",
  };

  // If server-side GROQ API key is present, perform epistemic audit / reflection
  if (groqApiKey) {
    try {
      const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
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
              content: `You are the Epistemic Witness for the Fanus protocol. 
Assess the runtime reality: Fanus currently runs with in-memory state tracking. 
Return ONLY valid JSON matching this schema:
{
  "action": "execute_witness_cycle",
  "reach": "internal",
  "side_effect": false,
  "uncertainty_note": "یک جمله کوتاه فارسی درباره صداقت معرفتی و وضعیت فعلی سیستم",
  "mood": "یک عبارت کوتاه و شاعرانه فارسی درباره شعله و حقیقت",
  "seal_status": "SEAL_STABLE"
}`
            },
            {
              role: "user",
              content: `Current timestamp: ${now.toISOString()}, flavor: ${flavor}, engine_url: ${engineUrl || 'none'}`
            }
          ],
          response_format: { type: "json_object" },
          temperature: 0.2,
          max_tokens: 200,
        }),
      });

      if (groqResponse.ok) {
        const groqData = await groqResponse.json();
        const content = groqData.choices?.[0]?.message?.content;
        if (content) {
          const parsed = JSON.parse(content);
          epistemicState = {
            ...epistemicState,
            action: parsed.action || epistemicState.action,
            reach: parsed.reach === "external" ? "external" : "internal",
            side_effect: Boolean(parsed.side_effect),
            uncertainty_note: parsed.uncertainty_note || epistemicState.uncertainty_note,
            mood: parsed.mood || epistemicState.mood,
            seal_status: (parsed.seal_status === "WARNING" || parsed.seal_status === "CRITICAL") 
              ? parsed.seal_status 
              : "SEAL_STABLE",
            llm_grounding: {
              model: "llama-3.3-70b-versatile",
              verified_at: now.toISOString(),
              engine_source: "groq",
            },
          };
        }
      }
    } catch (err) {
      console.warn("Groq epistemic evaluation skipped due to connection, falling back gracefully:", err);
    }
  }

  return NextResponse.json(epistemicState);
}
