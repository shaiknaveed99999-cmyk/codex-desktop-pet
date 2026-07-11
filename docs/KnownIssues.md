# Known Issues

## Current limitations

- The application provides a desktop window shell only; companion rendering, AI, voice, integrations, and plugins are not implemented.
- Settings currently control window-engine behavior and do not yet persist user preference profiles.
- The current package targets Windows x64 and is not code-signed.

## Known bugs

- No confirmed release-blocking bugs are open after Sprint 2 validation.
- A corrupt or inaccessible window-state file falls back silently to safe bounds; user-facing diagnostics are not yet available.

## Security improvements

- Add signed release artifacts and verify update provenance before public distribution.
- Add a formal threat model, dependency SBOM, vulnerability response process, and permission audit trail.
- Expand Electron E2E tests for navigation denial, click-through boundaries, tray lifecycle, and session permission denial.

## Performance improvements

- Add startup, idle CPU, memory, and renderer responsiveness baselines to CI or scheduled profiling.
- Add FPS and frame-time sampling once PixiJS rendering exists.
- Review screen/display listener cleanup and state-save debounce behavior during long-running sessions.

## Packaging limitations

- The current internal installer disables executable editing/signing to work in restricted build environments.
- The installer uses the default Electron icon and has no release-channel/update publishing configuration.
- External Git operations may be unavailable when GitHub DNS/network access is restricted.

## Future fixes

- Configure coverage thresholds and full Electron end-to-end smoke journeys.
- Add signed installer/update pipeline and rollback validation.
- Add user-facing recovery and export tools for local state.

