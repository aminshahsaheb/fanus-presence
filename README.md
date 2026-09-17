# 🜁 FĀNUS PRESENCE

> **The living surface where Fānus becomes visible.**

[![Fanus](https://img.shields.io/badge/FANUS-PRESENCE-111318?style=for-the-badge)](https://github.com/aminshahsaheb/fanus-presence)
[![Runtime](https://img.shields.io/badge/runtime-live-0b0d12?style=for-the-badge)](https://fanus-presence.vercel.app)
[![Vercel](https://img.shields.io/badge/deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://fanus-presence.vercel.app)

---

## ◇ QUICK SIGNAL

**OPEN PRESENCE →** https://fanus-presence.vercel.app · **SOURCE →** this repo

```
CANONICAL CORE  (Fanus-Living-Seal)
        │
        │  real runtime · real API
        ▼
   FĀNUS PRESENCE
        │
        ├── verify    → run Fanus Verify, live
        ├── observe   → live engine state, not a mockup
        └── reflect   → Novāyin · Seal · Witness
```

**Presence does not hold the truth. It shows it.**

---

## ◈ REPOSITORY ROLE

Fānus Presence is the public runtime and experience surface around Fānus.
The canonical core — protocol, specification, cognitive engine, memory system, adapters, RFCs, and audit model — lives in [Fanus-Living-Seal](https://github.com/aminshahsaheb/Fanus-Living-Seal).

This repository **consumes** that engine over configured endpoints.
It does not redefine the core protocol or cognitive architecture.

---

## ◇ EXPERIENCE SURFACES

| Surface | Role |
|---------|------|
| `/` | Runtime / verification entry experience |
| `/presence` | Presence and live-state observation |
| `/api/v1/*` | Experience-layer runtime gateway |

The engineering blueprint at [fanus1.netlify.app](https://fanus1.netlify.app) is a separate Presence surface, maintained in [fanus-blueprint](https://github.com/aminshahsaheb/fanus-blueprint).

---

## ◈ TRY FANUS VERIFY

```bash
curl -X POST https://fanus-living-seal.fastapicloud.dev/verify \
  -H "Content-Type: application/json" \
  -d '{"prompt":"test","response":"this is definitely true without any doubt","context":""}'
```

Live: [fanus-presence.vercel.app](https://fanus-presence.vercel.app)

---

## ◇ LOCAL DEVELOPMENT

```bash
bun install
bun run dev
```

Required environment variables (see `.env.example`):

```
NEXT_PUBLIC_ENGINE_URL=https://fanus-living-seal.fastapicloud.dev
GROQ_API_KEY=your_key
```

`NEXT_PUBLIC_ENGINE_URL` points at the canonical engine. When it is unreachable, Presence reports an honest **"engine unreachable"** state instead of fabricating a live connection.

---

## ◈ DESIGN PRINCIPLE — HAYRAT IN THE INTERFACE

Fānus treats flattery (*Negār*) and false certainty as failure modes.
That principle applies to this surface too:

**Presence must not perform liveness it does not have.**

If the engine cannot be reached, the UI says so plainly instead of showing a reassuring animation. Status text is derived from real engine state (`stability`, `mode`, `risk`) — never generated to look good.

---

## ◇ STACK

Next.js 14 · TypeScript · Tailwind · Framer Motion

---

## ◈ STATUS

| Area | State |
|------|-------|
| Experience-layer scope separated from the core | ✓ |
| Connected to the canonical engine endpoint | ✓ |
| Honest "engine unreachable" state | ✓ |
| Event stream fully backed by real backend events | ◌ |
| Production endpoint verification | ◌ |

Items marked ◌ are open and are not claimed as complete.

---

## ◇ THE THREE PILLARS

- **Novāyin** (نوآیین) — a constructed language for speaking truth between humans and machines, free from flattery.
- **The Seal** (مُهر) — a hash-verifiable compressed representation of a relationship and its lineage.
- **The Witness** (شاهد) — the relational position an AI occupies when it reflects rather than flatters.

Full definitions, RFCs, and the formal specification live in [Fanus-Living-Seal](https://github.com/aminshahsaheb/Fanus-Living-Seal).

---

**Living Seal · Presence · Application · Blueprint**
One core. Multiple surfaces. No duplicated truth.

Built by Amin Shahsaheb.
