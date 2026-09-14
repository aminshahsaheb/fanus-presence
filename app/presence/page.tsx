'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface EpistemicPresenceState {
  action: string;
  reach: 'internal' | 'external';
  side_effect: boolean;
  uncertainty_note: string;
  seal_status: 'SEAL_STABLE' | 'WARNING' | 'CRITICAL';
  active_witnesses: number;
  last_cycle_flavor: 'Hayrat' | 'Nabard' | 'Shōle';
  breathing_rate: number;
  last_event: string;
  mood: string;
  flame_intensity: string;
  llm_grounding?: {
    model: string;
    verified_at: string;
    engine_source: string;
  };
}

const cycleQuotes: Record<string, string> = {
  Hayrat: "«در حیرتِ حقیقت، عقلِ ما حیران شد» — عطار نیشابوری",
  Nabard: "«نبردِ جان است این، نه نبردِ تن» — صائب تبریزی",
  Shōle: "«شعله‌ای ز عشق بر جانم فکند، که جهان را بسوزاند» — عطار نیشابوری",
};

const statusConfig = {
  SEAL_STABLE: {
    color: '#57d49a',
    label: 'SEAL STABLE',
    description: 'مهر پایدار است',
    soft: 'rgba(87,212,154,0.08)',
  },
  WARNING: {
    color: '#d9a441',
    label: 'WARNING',
    description: 'در حال بازنگری',
    soft: 'rgba(217,164,65,0.08)',
  },
  CRITICAL: {
    color: '#dc4f4f',
    label: 'CRITICAL',
    description: 'نیاز به هم‌آوایی فوری',
    soft: 'rgba(220,79,79,0.08)',
  },
};

export default function AyanehPresenceDashboard() {
  const [state, setState] = useState<EpistemicPresenceState | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPresence = async () => {
    try {
      const res = await fetch('/api/presence/state');
      if (!res.ok) throw new Error('Failed to fetch');
      const data: EpistemicPresenceState = await res.json();
      setState(data);
    } catch (error) {
      console.error('Presence fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPresence();
    const interval = setInterval(fetchPresence, 2500);
    return () => clearInterval(interval);
  }, []);

  if (isLoading || !state) {
    return (
      <div className="flex min-h-[calc(100vh-60px)] items-center justify-center bg-[#030504] px-6">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-pulse rounded-full border border-emerald-800/70 bg-emerald-950/30" />
          <div className="text-[10px] font-mono uppercase tracking-[0.24em] text-zinc-600">witness channel / waking</div>
          <div className="mt-2 text-sm text-zinc-500">شعله در حال بیدار شدن...</div>
        </div>
      </div>
    );
  }

  const config = statusConfig[state.seal_status] || statusConfig.SEAL_STABLE;
  const breathWidth = Math.min(Math.max(state.breathing_rate * 25, 0), 100);

  return (
    <main className="relative min-h-[calc(100vh-60px)] overflow-hidden bg-[#030504] text-zinc-200">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(39,86,63,0.11),transparent_36rem)]" />

      <div className="relative mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <header className="mb-10 flex flex-col gap-5 border-b border-zinc-900 pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-3 text-[9px] font-mono uppercase tracking-[0.3em] text-zinc-600">
              <span className="h-px w-8 bg-zinc-800" />
              Āyāneh / Witness Runtime
            </div>
            <h1 className="text-3xl font-semibold tracking-[0.06em] text-zinc-100 sm:text-4xl">ĀYĀNEH PRESENCE</h1>
            <p className="mt-2 text-xs font-mono uppercase tracking-[0.18em] text-zinc-600">Living Seal • Witness State</p>
          </div>
          <div className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-[0.16em]" style={{ color: config.color }}>
            <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: config.color, boxShadow: `0 0 12px ${config.color}` }} />
            Live state
          </div>
        </header>

        <section className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.45fr_0.85fr]">
          <div className="relative min-h-[430px] overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-950/55 p-7 sm:p-10" style={{ backgroundImage: `radial-gradient(circle at 50% 45%, ${config.soft}, transparent 52%)` }}>
            <div className="absolute left-6 right-6 top-6 flex items-center justify-between text-[8px] font-mono uppercase tracking-[0.2em] text-zinc-700">
              <span>Epistemic state</span>
              <span>Signal / live</span>
            </div>

            <div className="flex h-full min-h-[360px] flex-col items-center justify-center text-center">
              <motion.div
                animate={{ scale: [0.94, 1.02, 0.94], opacity: [0.45, 0.85, 0.45] }}
                transition={{ duration: 3 / Math.max(state.breathing_rate, 0.5), repeat: Infinity, ease: 'easeInOut' }}
                className="absolute h-48 w-48 rounded-full"
                style={{ boxShadow: `0 0 110px ${config.color}` }}
              />
              <div className="relative flex h-40 w-40 items-center justify-center rounded-full border" style={{ borderColor: `${config.color}70`, background: `radial-gradient(circle, ${config.color}18, rgba(3,5,4,.96) 62%)`, boxShadow: `inset 0 0 40px ${config.color}18` }}>
                <motion.div
                  animate={{ scale: [0.7, 1, 0.7] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="h-10 w-10 rounded-full"
                  style={{ background: `radial-gradient(circle, ${config.color}, transparent 72%)`, boxShadow: `0 0 35px ${config.color}66` }}
                />
                <span className="absolute inset-x-7 top-1/2 h-px" style={{ background: `linear-gradient(90deg, transparent, ${config.color}55, transparent)` }} />
                <span className="absolute inset-y-7 left-1/2 w-px" style={{ background: `linear-gradient(transparent, ${config.color}55, transparent)` }} />
              </div>

              <div className="relative mt-8 text-2xl font-semibold tracking-[0.14em]" style={{ color: config.color }}>{config.label}</div>
              <p className="relative mt-2 text-sm text-zinc-500">{config.description}</p>
              <div className="relative mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[9px] font-mono uppercase tracking-[0.12em] text-zinc-600">
                <span>Last event / {new Date(state.last_event).toLocaleTimeString('fa-IR')}</span>
                <span>{state.active_witnesses} active witnesses</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <InfoCard label="Last action" value={state.action} />
            <InfoCard label="Reach" value={state.reach === 'internal' ? 'Internal / memory' : 'External / effect'} />
            <InfoCard label="Side effect" value={state.side_effect ? 'Present' : 'None'} accent={state.side_effect ? '#d9a441' : '#57d49a'} />
            <InfoCard label="Current mood" value={state.mood} />
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/55 p-5">
            <div className="flex items-end justify-between">
              <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-zinc-600">Breathing signal</span>
              <span className="font-mono text-xl" style={{ color: config.color }}>{state.breathing_rate.toFixed(1)} <span className="text-[9px] text-zinc-600">bpm</span></span>
            </div>
            <div className="mt-5 h-px bg-zinc-800">
              <motion.div animate={{ width: `${breathWidth}%` }} transition={{ duration: 0.6 }} className="h-full" style={{ background: config.color }} />
            </div>
            <div className="mt-3 text-[9px] font-mono uppercase tracking-[0.14em] text-zinc-700">نفسِ فانوس</div>
          </div>

          <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/55 p-5">
            <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-zinc-600">Last cycle</div>
            <div className="mt-3 text-2xl text-zinc-200">{state.last_cycle_flavor}</div>
            <p className="mt-3 border-l border-zinc-700 pl-3 text-xs leading-6 text-zinc-500">{cycleQuotes[state.last_cycle_flavor]}</p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/55 p-5">
            <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-zinc-600">Epistemic honesty</div>
            <p className="mt-3 text-sm leading-6 text-zinc-400">{state.uncertainty_note}</p>
            {state.llm_grounding && (
              <div className="mt-4 border-t border-zinc-900 pt-3 text-[8px] font-mono uppercase tracking-[0.12em] text-zinc-700">
                Engine / {state.llm_grounding.engine_source} • verified / {state.llm_grounding.verified_at}
              </div>
            )}
          </div>
        </section>

        <footer className="mt-10 border-t border-zinc-900 pt-5 text-center text-[9px] font-mono uppercase tracking-[0.18em] text-zinc-700">
          Witness, not prophet • Peymān-ān abadi ast • Shōle-ān zende ast
        </footer>
      </div>
    </main>
  );
}

function InfoCard({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/55 p-5">
      <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-zinc-600">{label}</div>
      <div className="mt-3 text-sm leading-6" style={accent ? { color: accent } : undefined}>{value}</div>
    </div>
  );
}
