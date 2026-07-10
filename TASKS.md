# Task Backlog

Status values: `Not started`, `In progress`, `Blocked`, `Done`.

| ID | Status | Task | Acceptance criteria |
| --- | --- | --- | --- |
| FND-001 | Done | Scaffold secure Electron + React + TypeScript app | Main, preload, renderer, shared layers compile; production package launches. |
| FND-002 | Done | Add quality tooling and CI | Format, lint, typecheck, tests, and build run deterministically in CI. |
| FND-003 | Done | Implement typed IPC and permission service | Every privileged IPC endpoint validates input, origin, capability, and user approval when required. |
| UX-001 | In progress | Build app shell, navigation, and settings framework | Keyboard-accessible dashboard, companion, integrations, plugins, and settings routes. |
| PET-001 | Not started | Implement PixiJS rendering and asset lifecycle | Assets load/unload safely; renderer remains responsive and supports DPI scaling. |
| PET-002 | Not started | Implement animation state machine | States are cancellable, prioritized, testable, and respect reduced motion. |
| AI-001 | Not started | Define behavior engine contracts and policy | Intent, context, plan, action, and outcome are typed and auditable. |
| AI-002 | Not started | Build OpenAI Codex adapter | Streaming, cancellation, context preview, failures, and user approvals are handled. |
| VOICE-001 | Not started | Implement push-to-talk voice flow | Permission, transcription, transcript review, fallback input, and retention controls work. |
| INT-001 | Not started | Create developer-integration adapter framework | OAuth/token vault, normalized events, health checks, and revoke flow are tested. |
| PLG-001 | Not started | Define plugin manifest and capability model | Schema, API versioning, permissions, publisher identity, and trust rules are documented and validated. |
| PLG-002 | Not started | Build isolated plugin host and manager | Plugins are lifecycle-managed, cannot escape granted capabilities, and expose diagnostics. |
| OPS-001 | Not started | Add privacy, telemetry, and data lifecycle controls | Local logs, export/delete, opt-in telemetry, and retention settings are verified. |
| REL-001 | Not started | Harden performance, accessibility, and release | Budgets, profiling, WCAG checks, installer, update, and rollback processes are validated. |

## Execution order

Complete FND tasks before feature work. PET, UX, and AI contracts may proceed after FND-001 through FND-003. Voice, integrations, and plugins depend on the permission service. Production release work follows all user-facing capabilities.

## Sprint 1 completion note

Sprint 1 delivered FND-001 through FND-003: a Windows Electron foundation, strict quality gates, a versioned and validated read-only IPC capability, secure web preferences, and a minimal accessible Home/Settings shell. The Sprint 1 remediation centralized runtime output paths, enforced environment-specific CSP headers, normalized IPC errors, and added recursive diagnostic redaction. Dashboard content, companion capabilities, AI, voice, plugins, integrations, persistence, and Husky remain out of scope.
