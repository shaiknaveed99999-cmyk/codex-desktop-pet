# ADR-001: Project Architecture

- **Status:** Accepted
- **Date:** 2026-07-10

## Context

Pets needs a Windows desktop UI, privileged operating-system access, future high-frequency companion rendering, and strong isolation between untrusted UI and desktop capabilities.

## Decision

Use Electron with a React/TypeScript renderer, a privileged TypeScript main process, a narrow context-isolated preload bridge, and process-neutral shared contracts. Keep the application under `app/` and organize source by process responsibility.

## Consequences

The model is familiar and supports Windows integration, but requires explicit IPC design and Electron security discipline. PixiJS and future provider adapters remain isolated behind feature boundaries.

