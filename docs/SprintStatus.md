# Sprint Status

## Current status

Pets is at version **0.1.0**. Sprint 1 (Foundation) and Sprint 2 (Desktop Window Engine) are complete and approved. The repository is stable on the `feature/window-engine` branch, with the packaged Windows application, quality gates, and runtime smoke checks passing.

The project is currently in a documentation and organization checkpoint before Sprint 3. No Sprint 3 implementation has started.

## Completed sprints

### Sprint 1 — Foundation

- Secure Electron main/preload/renderer/shared process boundaries.
- Typed, validated IPC and permission foundation.
- React shell, settings placeholder, CSP, diagnostics, CI, lint, typecheck, tests, and Windows packaging.

### Sprint 2 — Desktop Window Engine

- Transparent frameless rounded window with drag-anywhere behavior.
- Always-on-top, tray restore, click-through toggle, snapping, persisted bounds, multi-monitor/DPI state.
- Settings screen, debug overlay, FPS monitor, and deterministic window-engine tests.

## Current sprint

**Pre-Sprint 3 documentation and organization.** This checkpoint creates contributor, testing, release, metrics, issue, roadmap, and ADR documentation without changing runtime behavior.

## Upcoming sprints

1. Sprint 3 — Companion rendering foundation (PixiJS asset lifecycle and static stage).
2. Sprint 4 — Animation state engine and reduced-motion behavior.
3. Sprint 5 — AI behavior contracts and consented Codex integration.
4. Sprint 6 — Voice, developer integrations, and plugin platform.

## Milestones

| Milestone | Status |
| --- | --- |
| Secure application foundation | Complete |
| Desktop window engine | Complete |
| Enterprise repository documentation | In progress |
| Static companion rendering | Planned |
| AI/Codex integration | Planned |
| Production beta hardening | Planned |

## Version history

| Version | Date | Summary |
| --- | --- | --- |
| 0.1.0 | 2026-07-10 | Foundation and desktop window engine. |
| Next | TBD | Sprint 3 companion-rendering milestone. |

