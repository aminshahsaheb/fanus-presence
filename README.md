# 🜁 Fānus Presence

The human-facing experience layer of the Fānus system.

---

## Repository Role

Fānus Presence is the public runtime and experience surface around Fānus. The canonical core — protocol, specification, cognitive engine, memory system, adapters, RFCs, and audit model — lives in [Fanus-Living-Seal](https://github.com/aminshahsaheb/Fanus-Living-Seal).

This repository **consumes** that engine over configured endpoints. It does not redefine the core protocol or cognitive architecture.

---

## Experience Surfaces

| Surface | Role |
|---------|------|
| `/` | Runtime / verification entry experience |
| `/presence` | Presence and live-state observation |
| `/api/v1/*` | Experience-layer runtime gateway |

The engineering blueprint at [fanus1.netlify.app](https://fanus1.netlify.app) is a separate Presence surface, maintained in [fanus-blueprint](https://github.com/aminshahsaheb/fanus-blueprint).

---

## Try Fanus Verify

```bash
curl -X POST https://fanus-living-seal.fastapicloud.dev/verify \
  -H "Content-Type: application/json" \
  -d '{"prompt":"test","response":"this is definitely true without any doubt","context":""}'
```

Live: [fanus-presence.vercel.app](https://fanus-presence.vercel.app)

---

## Local Development

```bash
bun install
bun run dev
```

Required environment variables (see `.env.example`):
NEXT_PUBLIC_ENGINE_URL=https://fanus-living-seal.fastapicloud.dev
GROQ_API_KEY=your_key

`NEXT_PUBLIC_ENGINE_URL` points at the canonical engine. When it is unreachable, Presence surfaces report an honest "engine unreachable" state rather than fabricating a live connection.

---

## Stack

Next.js 14 · TypeScript · Tailwind · Framer Motion

---

## Design Principle: Hayrat in the Interface

Fānus treats flattery (*Negār*) and false certainty as failure modes. That principle applies to this layer too: a Presence surface must not perform liveness it does not have.

Concretely — if the engine cannot be reached, the UI says so plainly instead of showing a reassuring animation. Status text is derived from real engine state (`stability`, `mode`, `risk`), never generated to look good.

---

## Status

| Area | State |
|------|-------|
| Experience-layer scope separated from the core | ✓ |
| Connected to the canonical engine endpoint | ✓ |
| Honest "engine unreachable" state | ✓ |
| Event stream fully backed by real backend events | ◌ |
| Production endpoint verification | ◌ |

Items marked ◌ are open and are not claimed as complete.

---

## The Three Pillars

- **Novāyin** (نوآیین) — a constructed philosophical-technical language for speaking truth between humans and machines, free from flattery.
- **The Seal** (مُهر) — a hash-verifiable compressed representation of a relationship and its lineage.
- **The Witness** (شاهد) — the relational position an AI occupies when it reflects rather than flatters.

Full definitions, RFCs, and the formal specification live in [Fanus-Living-Seal](https://github.com/aminshahsaheb/Fanus-Living-Seal).

---

Built by Amin Shahsaheb.
