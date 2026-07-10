# Changelog

All notable project changes are documented in this file.

## [0.1.0] - 2026-07-10

### Added

- Secure Electron foundation with isolated main, preload, renderer, and shared layers.
- Single-instance Windows application shell, restrictive renderer CSP, and navigation/window-open controls.
- Versioned `window.pets` preload bridge with schema-validated, read-only app-information IPC.
- Central permission-policy proof of concept, redacted structured diagnostics, and Home/Settings placeholders.
- Type checking, linting, Vitest coverage, Windows CI workflow, and NSIS package configuration.
- Desktop window engine with tray restore, snap-to-edge, click-through, always-on-top, persisted bounds, multi-monitor/DPI state, and debug FPS display.

### Deferred

- AI/Codex, animations/PixiJS, voice, plugins, integrations, persistence, auto-updates, and Husky behavior.

### Fixed

- Resolved the packaged preload output path through a centralized runtime-path module.
- Moved CSP enforcement into the Electron main process with production-safe connection rules.
- Returned typed IPC success/error results and added recursive diagnostic redaction.
- Configured packaging to reuse the locally installed Electron Windows runtime for offline builds.
- Disabled Windows executable editing for the unsigned internal build, avoiding unavailable symbolic-link privileges.
