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
  state_source: "real_engine" | "fallback";
  llm_grounding?: {
    model: string;
    verified_at: string;
    engine_source: "groq" | "fallback_internal" | "fanus_engine";
  };
}

const flavors: ("Hayrat" | "Nabard" | "Shōle")[] = ["Hayrat", "Nabard", "Shōle"];

async function fetchRealEngineState(engineUrl: string) {
  const res = await fetch(engineUrl + "/demo/status", {
    signal: AbortSignal.timeout(4000),
    cache: "no-store",
  });
  if (!res.ok) throw new Error("engine responded " + res.status);
  return res.json() as Promise<{ name: string; version: string; status: string; mode: string; stability: number }>;
}

function sealStatusFromStability(stability: number): "SEAL_STABLE" | "WARNING" | "CRITICAL" {
  if (stability >= 0.7) return "SEAL_STABLE";
  if (stability >= 0.4) return "WARNING";
  return "CRITICAL";
}

export async function GET(request: NextRequest) {
  void request;

  const engineUrl = process.env.NEXT_PUBLIC_ENGINE_URL;
  const now = new Date();
  const seconds = now.getSeconds();

  const flavorIndex = Math.floor(seconds / 20) % flavors.length;
  const flavor = flavors[flavorIndex];
  const breathing = 0.8 + 0.5 * Math.sin(now.getTime() / 4000);

  let epistemicState: EpistemicExecutionState = {
    action: "no_engine_url_configured",
    reach: "internal",
    side_effect: false,
    uncertainty_note: "متغیر NEXT_PUBLIC_ENGINE_URL تنظیم نشده.",
    seal_status: "WARNING",
    active_witnesses: 0,
    last_cycle_flavor: flavor,
    breathing_rate: parseFloat(breathing.toFixed(1)),
    last_event: now.toISOString(),
    mood: "در انتظار اتصال",
    flame_intensity: "🜁",
    state_source: "fallback",
  };

  if (engineUrl) {
    try {
      const real = await fetchRealEngineState(engineUrl);
      epistemicState = {
        action: "GET /demo/status",
        reach: "external",
        side_effect: false,
        uncertainty_note: "اتصال زنده برقرار است؛ stability=" + real.stability + ", mode=" + real.mode + ".",
        seal_status: sealStatusFromStability(real.stability),
        active_witnesses: 0,
        last_cycle_flavor: flavor,
        breathing_rate: parseFloat(breathing.toFixed(1)),
        last_event: now.toISOString(),
        mood: real.mode === "stable_core_state"
          ? "آرام و متمرکز — شعله زنده و متصل است"
          : "در حالت " + real.mode,
        flame_intensity: "🜂",
        state_source: "real_engine",
        llm_grounding: {
          model: "fanus-engine-live",
          verified_at: now.toISOString(),
          engine_source: "fanus_engine",
        },
      };
    } catch (err) {
      console.warn("Could not reach real Fanus engine, falling back:", err);
      epistemicState.uncertainty_note = "موتور واقعی در دسترس نیست.";
      epistemicState.action = "engine_unreachable";
    }
  }

  if (false) {
    try {
      const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + groqApiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "groq/compound",
          messages: [
            {
              role: "system",
              content: "You are the Epistemic Witness for Fanus. The real backend is currently unreachable. Be honest about that, do not claim a live connection. Return ONLY JSON: {"uncertainty_note": "Persian sentence honestly stating the real engine is unreachable", "mood": "short poetic Persian phrase about silence or waiting, not false connection"}"
            },
            {
              role: "user",
              content: "timestamp: " + now.toISOString() + ", flavor: " + flavor
            }
          ],
          response_format: { type: "json_object" },
          temperature: 0.3,
          max_tokens: 150,
        }),
        signal: AbortSignal.timeout(4000),
      });

      if (groqResponse.ok) {
        const groqData = await groqResponse.json();
        const content = groqData.choices?.[0]?.message?.content;
        if (content) {
          const parsed = JSON.parse(content);
          epistemicState = {
            ...epistemicState,
            uncertainty_note: parsed.uncertainty_note || epistemicState.uncertainty_note,
            mood: parsed.mood || epistemicState.mood,
            llm_grounding: {
              model: "groq/compound",
              verified_at: now.toISOString(),
              engine_source: "groq",
            },
          };
        }
      }
    } catch (err) {
      console.warn("Groq styling skipped:", err);
    }
  }

  return NextResponse.json(epistemicState);
}
