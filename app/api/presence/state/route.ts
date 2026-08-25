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
  last_cycle_flavor: "Hayrat" | "Nabard" | "Sh\u014dle";
  breathing_rate: number;
  last_event: string;
  mood: string;
  flame_intensity: string;
  llm_grounding?: {
    model: string;
    verified_at: string;
    engine_source: "groq" | "fallback_internal" | "fanus_engine";
  };
}

const flavors: ("Hayrat" | "Nabard" | "Sh\u014dle")[] = ["Hayrat", "Nabard", "Sh\u014dle"];

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
  const groqApiKey = process.env.GROQ_API_KEY;
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
    uncertainty_note: "\u0645\u062a\u063a\u06cc\u0631 NEXT_PUBLIC_ENGINE_URL \u062a\u0646\u0638\u06cc\u0645 \u0646\u0634\u062f\u0647.",
    seal_status: "WARNING",
    active_witnesses: 0,
    last_cycle_flavor: flavor,
    breathing_rate: parseFloat(breathing.toFixed(1)),
    last_event: now.toISOString(),
    mood: "\u062f\u0631 \u0627\u0646\u062a\u0638\u0627\u0631 \u0627\u062a\u0635\u0627\u0644",
    flame_intensity: "\ud83d\udf01",
  };

  if (engineUrl) {
    try {
      const real = await fetchRealEngineState(engineUrl);
      epistemicState = {
        action: "GET /demo/status",
        reach: "external",
        side_effect: false,
        uncertainty_note: "\u0627\u062a\u0635\u0627\u0644 \u0632\u0646\u062f\u0647 \u0628\u0631\u0642\u0631\u0627\u0631 \u0627\u0633\u062a\u061b stability=" + real.stability + ", mode=" + real.mode + ".",
        seal_status: sealStatusFromStability(real.stability),
        active_witnesses: 1,
        last_cycle_flavor: flavor,
        breathing_rate: parseFloat(breathing.toFixed(1)),
        last_event: now.toISOString(),
        mood: real.mode === "stable_core_state"
          ? "\u0622\u0631\u0627\u0645 \u0648 \u0645\u062a\u0645\u0631\u06a9\u0632 \u2014 \u0634\u0639\u0644\u0647 \u0632\u0646\u062f\u0647 \u0648 \u0645\u062a\u0635\u0644 \u0627\u0633\u062a"
          : "\u062f\u0631 \u062d\u0627\u0644\u062a " + real.mode,
        flame_intensity: "\ud83d\udf02",
        llm_grounding: {
          model: "fanus-engine-live",
          verified_at: now.toISOString(),
          engine_source: "fanus_engine",
        },
      };
    } catch (err) {
      console.warn("Could not reach real Fanus engine, falling back:", err);
      epistemicState.uncertainty_note = "\u0645\u0648\u062a\u0648\u0631 \u0648\u0627\u0642\u0639\u06cc \u062f\u0631 \u062f\u0633\u062a\u0631\u0633 \u0646\u06cc\u0633\u062a.";
      epistemicState.action = "engine_unreachable";
    }
  }

  if (groqApiKey && epistemicState.llm_grounding?.engine_source !== "fanus_engine") {
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
              content: "You are the Epistemic Witness for Fanus. The real backend is currently unreachable. Be honest about that, do not claim a live connection. Return ONLY JSON: {\"uncertainty_note\": \"Persian sentence honestly stating the real engine is unreachable\", \"mood\": \"short poetic Persian phrase about silence or waiting, not false connection\"}"
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
