# ADR-003: IPC Contract Strategy

- **Status:** Accepted
- **Date:** 2026-07-10

## Context

Electron IPC is a trust boundary. Unversioned channels or arbitrary payloads would make security and compatibility regressions difficult to detect.

## Decision

Define channel names and Zod schemas in `src/shared`, expose capability-specific methods through `window.pets`, validate inputs in main and outputs in preload, and return discriminated success/error results for expected failures.

## Consequences

Contracts add a small amount of ceremony and schema maintenance. In return, malformed requests, provider failures, and future API evolution are explicit and testable.

