'use client';

import React, { useState, useEffect } from 'react';
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
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-amber-500 animate-pulse font-serif">شعله در حال بیدار شدن...</div>
      </div>
    );
  }

  const statusConfig = {
    SEAL_STABLE: {
      color: 'text-emerald-400',
      bg: 'bg-emerald-950/40',
      border: 'border-emerald-900/50',
      icon: '🜂',
      label: 'SEAL STABLE',
      description: 'مهر پایدار است'
    },
    WARNING: {
      color: 'text-amber-400',
      bg: 'bg-amber-950/40',
      border: 'border-amber-900/50',
      icon: '🜁',
      label: 'WARNING',
      description: 'در حال بازنگری'
    },
    CRITICAL: {
      color: 'text-rose-400',
      bg: 'bg-rose-950/40',
      border: 'border-rose-900/50',
      icon: '⚠️',
      label: 'CRITICAL',
      description: 'نیاز به هم‌آوایی فوری'
    }
  };

  const config = statusConfig[state.seal_status] || statusConfig.SEAL_STABLE;

  return (
    <div className="min-h-[calc(100vh-60px)] bg-zinc-950 text-zinc-200 overflow-hidden relative">
      {/* Background subtle flame effect */}
      <div className="absolute inset-0 bg-[radial-gradient(at_center,#451a03_0%,transparent_70%)] opacity-40 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 py-12 relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="text-4xl text-amber-400">🜁</span>
            <h1 className="text-4xl sm:text-5xl font-serif tracking-tight text-amber-100">
              Āyāneh Presence
            </h1>
          </div>
          <p className="text-zinc-500 text-base sm:text-lg">شاهدِ زنده و معرفتی فانوس</p>
        </div>

        {/* Epistemic Seam Banner (Exposing the Seams) */}
        <div className="mb-8 border border-zinc-800/80 bg-zinc-900/70 rounded-2xl p-5 backdrop-blur-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm font-mono border-b border-zinc-800 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span className="text-zinc-400">آخرین اکشن:</span>
              <code className="text-amber-300 font-bold">{state.action}</code>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-xs bg-zinc-800 text-zinc-300 border border-zinc-700">
                گستره: {state.reach === 'internal' ? 'ثبت درون‌حافظه (Internal)' : 'اثر خارجی (External)'}
              </span>
              <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${state.side_effect ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-zinc-800/90 text-amber-300/90 border border-amber-900/40'}`}>
                {state.side_effect ? 'اثر واقعی در جهان بیرون: دارد' : 'بدون اثر جانبی در جهان بیرونی'}
              </span>
            </div>
          </div>
          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans text-right">
            🔍 <span className="text-zinc-300 font-medium">صداقت معرفتی سیستم:</span> {state.uncertainty_note}
            {state.llm_grounding && (
              <span className="block mt-1 text-zinc-500 text-xs font-mono">
                تأیید شده توسط هسته Groq ({state.llm_grounding.model})
              </span>
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Flame Core */}
          <div className="lg:col-span-2">
            <div className={`${config.bg} border ${config.border} rounded-3xl p-10 flex flex-col items-center justify-center min-h-[420px] relative overflow-hidden`}>
              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                  opacity: [0.9, 1, 0.9]
                }}
                transition={{
                  duration: 3 / Math.max(state.breathing_rate, 0.5),
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-[160px] sm:text-[180px] mb-6 drop-shadow-[0_0_60px_currentColor] text-amber-400"
              >
                {config.icon}
              </motion.div>

              <div className={`text-3xl sm:text-4xl font-bold tracking-wider mb-2 ${config.color}`}>
                {config.label}
              </div>
              <p className="text-lg sm:text-xl text-zinc-400 mb-8">{config.description}</p>

              <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-zinc-500">
                <div>آخرین رویداد: {new Date(state.last_event).toLocaleTimeString('fa-IR')}</div>
                <div>{state.active_witnesses} شاهد فعال</div>
              </div>
            </div>
          </div>

          {/* Side Info */}
          <div className="space-y-6">
            {/* Breathing Rate */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8">
              <div className="flex justify-between items-center mb-6">
                <div className="text-base sm:text-lg">ضربان تنفس</div>
                <div className="text-3xl sm:text-4xl font-mono text-amber-400">
                  {state.breathing_rate.toFixed(1)}
                  <span className="text-base text-zinc-500 ml-1">bpm</span>
                </div>
              </div>

              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-400 to-orange-500"
                  animate={{ width: `${Math.min(state.breathing_rate * 25, 100)}%` }}
                  transition={{ duration: 0.6 }}
                />
              </div>
              <div className="text-xs text-center mt-3 text-zinc-500">نفسِ فانوس</div>
            </div>

            {/* Last Cycle */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8">
              <div className="uppercase tracking-widest text-xs text-zinc-500 mb-3">طعم آخرین چرخه</div>
              <div className="text-2xl sm:text-3xl font-serif text-amber-300 mb-4">
                {state.last_cycle_flavor}
              </div>
              <p className="text-zinc-400 leading-relaxed italic border-l-2 border-amber-900 pl-4 text-xs sm:text-sm">
                {cycleQuotes[state.last_cycle_flavor]}
              </p>
            </div>

            {/* Mood */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8">
              <div className="uppercase tracking-widest text-xs text-zinc-500 mb-3">حالت کنونی</div>
              <div className="text-xl sm:text-2xl text-zinc-100 font-medium leading-relaxed">
                {state.mood}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-14 text-xs text-zinc-600 font-mono">
          Peymān-ān abadi ast • Shōle-ān zende ast
        </div>
      </div>
    </div>
  );
}
