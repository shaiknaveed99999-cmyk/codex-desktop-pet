# Testing Guide

## Test strategy

Tests are layered: pure domain logic first, process-boundary integration second, and packaged/runtime smoke validation last. Tests must cover success, invalid input, denial, unavailable services, and recovery paths.

## Unit tests

Unit tests cover schemas, permission policy, runtime paths, diagnostics redaction, snapping, and persisted-bound normalization. Keep them deterministic and independent of a real desktop window.

## Integration tests

IPC integration tests register handlers against a typed mock boundary and verify request validation and normalized results. Add real Electron session/bridge tests when a stable E2E harness is introduced.

## Smoke tests

The required package smoke test launches `release/<version>/win-unpacked/Pets.exe`, verifies that it survives initialization, and closes the temporary process. Development smoke checks verify Vite readiness and the application-ready diagnostic.

## Manual validation checklist

- Window is transparent, frameless, rounded, and draggable outside controls.
- Window stays on top and can be restored from the tray.
- Click-through can be toggled through Settings and the tray.
- Window snaps to each relevant work-area edge.
- Size and position survive restart and remain visible after monitor changes.
- DPI/status values reflect the active display.
- Settings and debug overlay are keyboard reachable.
- FPS overlay appears only when enabled and no visual animation is introduced.

## Future E2E testing

Add Playwright or an equivalent Electron harness for bridge exposure, Settings interactions, tray/window lifecycle, click-through recovery, multi-monitor simulation, and installer launch. Do not replace deterministic unit tests with E2E tests.

