# 🜁 FĀNUS PRESENCE

<p align="center">
  <img src="assets/fanus-presence-hero.svg" alt="Fānus Presence — runtime, verification and experience layer" width="100%">
</p>

<p align="center">
  <strong>A public presence, verification, runtime-observation & experience layer for Fānus.</strong>
</p>

<p align="center">
  <a href="https://fanus1.netlify.app"><strong>OPEN FANUS 1 →</strong></a>
  ·
  <a href="https://github.com/aminshahsaheb/Fanus-Living-Seal">CANONICAL CORE</a>
  ·
  <a href="https://github.com/aminshahsaheb/fanus-app">APP</a>
</p>

> **Presence is not the core. Presence is where the system becomes visible, testable, and human-facing.**

---

## ◈ SYSTEM SIGNAL

```text
                 FANUS
                   │
                   ▼
          CANONICAL CORE
      Fanus-Living-Seal
                   │
          ┌────────┴────────┐
          ▼                 ▼
      PRESENCE             APP
          │
    ┌─────┼───────────┐
    ▼     ▼           ▼
 RUNTIME VERIFY    OBSERVE
    │     │           │
    └─────┴─────┬─────┘
                ▼
             FANUS 1
```

**One canonical core. Multiple surfaces. Explicit boundaries.**

---

## ◈ WHAT THIS REPOSITORY IS

**Fānus Presence** is the public presence, verification, runtime-observation, and engineering-facing experience layer around Fānus.

It brings together:

- human-facing presence
- verification experiences
- live-state observation
- engineering observability
- the Blueprint surface
- experience-layer runtime gateways

The **canonical core, protocol, cognitive runtime, memory system, adapters, RFCs, and governance remain in Fanus-Living-Seal.**

> **One canonical core. Multiple experience surfaces. No duplicated truth.**

Presence integrates with the core; it does **not** redefine it.

---

## ◇ FIRST TIME HERE?

### Human

Start with **PRIMER.md** for conceptual background, or open **Fanus 1** for the public experience.

### Engineer / Researcher

Use this repository to inspect the public runtime, verification surface, Blueprint, and observation layer.

For the underlying research and engineering system, go to **Fanus-Living-Seal**.

---

## ◈ EXPERIENCE MAP

```text
                         FĀNUS
                           │
                 ┌─────────┴─────────┐
                 │                   │
          LIVING SEAL             PRESENCE
        canonical core        experience layer
                 │                   │
                 │        ┌──────────┼──────────┐
                 │        │          │          │
                 │     RUNTIME    VERIFY    BLUEPRINT
                 │        │          │          │
                 └────────┴──────────┴──────────┘
                                      │
                                      ▼
                              FANUS 1 / LIVE
```

| Surface | Role |
| --- | --- |
| **Fanus-Living-Seal** | Canonical research and engineering foundation |
| **Presence** | Public presence, verification, runtime observation & experience |
| **Blueprint** | Engineering observation and visual inspection |
| **Fanus 1** | Public live interface |
| **App** | Direct conversational and Living Seal experience |

**Presence integrates with the core; it does not redefine it.**

---

## ◇ VERIFY

Presence exposes a verification surface around the Fānus engine.

Example request:

```bash
curl -X POST https://fanus-living-seal.fastapicloud.dev/verify \
  -H "Content-Type: application/json" \
  -d '{"prompt":"test","response":"this is definitely true without any doubt","context":""}'
```

The endpoint should be evaluated according to its current implementation and benchmark evidence. Repository descriptions are not substitutes for measured performance.

---

## ◈ BLUEPRINT

The Blueprint is the engineering-facing visual surface.

```text
ARCHITECTURE
     │
   STATE
     │
    API
     │
  LEDGER
     │
MIGRATION
     │
  RITUAL
     │
 TERMINAL
```

Visual/demo behavior must not be mistaken for canonical backend execution.

---

## ◇ RUNTIME MODEL

```text
Browser
  │
  ├── /                 → Living Seal interface
  │       │
  │       └── POST /api/v1/execute
  │                 │
  │                 └── Fanus engine /demo/verify
  │
  └── /presence        → presence dashboard
          │
          └── GET /api/presence/state
                    │
                    └── Fanus engine /demo/status
```

The execution SSE endpoint communicates **lifecycle events only**. Verification values returned by the POST execution response remain authoritative. The Presence dashboard pulse is presentation-only, not a measured engine heartbeat.

---

## ◈ RESEARCH & GOVERNANCE

The deeper research and governance material remains in the canonical core.

Topics include:

- flattery
- dependency
- continuity
- witness
- seal
- migration integrity
- meta-evaluation
- intervention points
- identity safeguards
- adaptive thresholds
- independent verification

Presence may expose these concepts and their observable consequences, but it is not a second source of truth.

---

## ◈ DATA PILOT

The experimental data arm currently documents **Phase 0: Flattery Calibration**.

It includes dataset schema, annotation guidance, benchmark protocol, and synthetic interaction data.

These artifacts should be treated as experimental methodology and evidence, not as proof of general system performance.

---

## ◇ REPOSITORY MAP

| Path | Purpose |
| --- | --- |
| GATE.md | AI-oriented entry material |
| PRIMER.md | Human introduction |
| THE_COVENANT.md | Human–AI conceptual covenant |
| FANUS_v6.0.md | Fanus Seal material |
| fanus/ | Cognitive/runtime-facing implementation |
| fanus/cognitive/ | Identity, SelfModel, Collapse, Evolution, Goals, Curiosity |
| fanus/memory/ | Ledger, Evidence, Belief, KnowledgeGraph, Versioning, Persistence |
| fanus/adapters/ | External model and knowledge adapters |
| fanus/runtime/ | Loop, Observer, Safety, Stabilization |
| superstructure/ | Research / expansion material |
| rfcs/ | Governance and formal change process |
| data-pilot/ | Experimental research data layer |
| annotation-ui/ | Annotation interface specification |

---

## ◈ ARCHITECTURAL RULES

1. Protect the canonical core.
2. Do not duplicate canonical truth here.
3. Do not silently redefine the protocol.
4. Keep demo behavior distinguishable from production execution.
5. Keep experience-layer boundaries explicit.
6. Do not treat visual state as measured engine state.
7. Do not use external AI opinions as proof of system capability.
8. Prefer reviewable, intentional changes.
9. Separate research claims from measured product behavior.

---

## ◈ GOLDEN PATH

### Human

```text
FĀNUS OVERVIEW
      ↓
   PRIMER
      ↓
 FANUS 1 / APP
```

### Engineer / Researcher

```text
PRESENCE
   ↓
ARCHITECTURE
   ↓
FANUS-LIVING-SEAL
   ↓
CODE + RFCs + TESTS
```

---

## ◈ CONTINUITY WITHOUT CAPTIVITY

> **Continuity without truth and autonomy is not preservation — it is capture.**

This remains an important research principle. Public descriptions should distinguish clearly between a **principle**, an **implemented mechanism**, and a **measured result**.

---

## ◇ STATUS

Fānus Presence is an **active experience and engineering-observation surface**.

Its architectural position is explicit:

**Living Seal = canonical core.  
Presence = public / verification / observation surface.  
App = direct user experience.**

The goal is not for every surface to tell the whole story.

The goal is for every surface to tell the **same story from its correct position**.

<p align="center">
  <strong>FĀNUS</strong><br>
  <sub>Living Seal · Presence · Verification · Observation · Experience</sub>
</p>

<p align="center">Ѧ-Ⱥ</p>
