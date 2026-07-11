# Project Metrics

## Current baseline

Measured from `app/src` and `app/tests` on 2026-07-11:

| Metric | Value |
| --- | ---: |
| Application source files (`.ts`, `.tsx`, `.css`) | 24 |
| Test files | 8 |
| Automated tests | 12 |
| Current version | 0.1.0 |
| Build status | Passing: Vite bundle and Windows NSIS package |
| Lint status | Passing |
| Typecheck status | Passing |
| Coverage | Not yet configured; placeholder for a future threshold |

## Release history

- **0.1.0** — Secure Electron foundation and desktop window engine.
- **Next** — Sprint 3 companion rendering foundation, pending planning and approval.

## Technical debt summary

- Coverage reporting and enforced thresholds are not configured.
- The test suite is primarily unit/integration based; full Electron E2E coverage is planned.
- The internal Windows package is unsigned and uses default Electron packaging metadata/iconography.
- Dependency audit findings require a scheduled, controlled remediation.
- Window-state persistence and diagnostics are intentionally lightweight and need broader lifecycle observability before production.
- The current `app/` nested application root should remain documented until a deliberate repository-layout ADR changes it.

## Measurement policy

Metrics should be regenerated at sprint boundaries, with the command, date, and scope recorded. Generated build output, `node_modules`, and release artifacts are excluded from source-file counts.

