# ADR-002: Electron Security Decisions

- **Status:** Accepted
- **Date:** 2026-07-10

## Context

Renderer content, future model output, plugin data, and external developer data must not gain ambient access to the operating system or credentials.

## Decision

Enable context isolation and sandboxing, disable Node integration, expose only named preload methods, validate IPC at runtime, use restrictive CSP, deny navigation/new windows/webviews/session permissions by default, and keep secrets out of renderer state and logs.

## Consequences

Security review is concentrated at the preload/main boundary. Features require more explicit adapters and tests, but a compromised renderer has substantially less authority.

