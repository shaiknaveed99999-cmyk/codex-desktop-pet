# ADR-004: Desktop Window Engine

- **Status:** Accepted
- **Date:** 2026-07-10

## Context

The companion needs a persistent, transparent desktop surface that can live in the tray, move across displays, snap to work-area edges, and be made click-through without adding animation or companion behavior.

## Decision

Use a transparent, frameless BrowserWindow with CSS drag regions, always-on-top support, a tray controller, validated local bounds persistence, display work-area snapping, `setIgnoreMouseEvents` for click-through, and display scale-factor reporting.

## Consequences

The window engine is Windows-focused and requires careful lifecycle cleanup and manual multi-monitor validation. It provides a stable surface for later PixiJS rendering without coupling rendering to window management.

