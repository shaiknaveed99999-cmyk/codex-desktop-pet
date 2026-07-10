# AGENTS.md

## Purpose

`pets` is a Windows desktop AI companion. It is a greenfield Electron, React, TypeScript, and PixiJS application. This file defines the operating rules for human and AI contributors.

## Working agreement

- Read `PROJECT_SPEC.md`, `ARCHITECTURE.md`, and `CODING_STANDARDS.md` before changing application code.
- Keep changes scoped to one task in `TASKS.md`; update that task's status and relevant documentation with the implementation.
- Preserve the Electron security boundary: renderer code never receives unrestricted Node.js, filesystem, shell, credential, or network access.
- Use typed IPC contracts and capability-scoped preload APIs. Do not add ad-hoc IPC channels.
- Treat plugins, model output, speech transcripts, and external developer-tool data as untrusted input.
- Require explicit user confirmation before any consequential external action, including terminal execution, repository mutation, credential use, or data transmission.
- Do not commit secrets, API keys, generated build output, local databases, recordings, or user telemetry.

## Expected layout

```text
src/
  main/        Electron lifecycle, secure services, adapters, persistence
  preload/     Narrow, versioned renderer bridge
  renderer/    React UI, PixiJS stage, state, feature modules
  shared/      Contracts, schemas, domain models, pure utilities
plugins/       Packaged plugins and development fixtures
tests/         Unit, integration, and end-to-end tests
docs/          Supporting design and operational documents
```

## Delivery gates

Before requesting review, run the repository's configured format, lint, typecheck, unit-test, and production-build commands. Add or update tests for observable behavior. For changes to animation, test reduced-motion behavior and measure frame performance; for IPC, plugin, voice, or Codex work, add negative-path and permission tests.

## Decision rules

- Prefer small, composable modules and explicit interfaces over cross-layer imports.
- Prefer local-first storage and least-privilege permissions.
- Add a dependency only when it has a clear owner, license review, maintenance rationale, and bundle-impact assessment.
- Record non-trivial architectural decisions in `ARCHITECTURE.md` or a linked ADR before implementation.

