# Architecture

## Overall architecture

Pets is a Windows Electron desktop application with React in the renderer and TypeScript contracts shared across process boundaries. The architecture is local-first, capability-oriented, and designed to keep future AI and plugin behavior outside the renderer’s authority.

```text
Windows shell / tray
        │
Electron main ─── local state, window engine, permissions, diagnostics
        │ typed IPC via preload
Renderer ─────── React settings/window UI and future PixiJS stage
        │
Shared contracts / schemas / error codes
```

## Electron process model

- **Main process:** owns application lifecycle, BrowserWindow, tray, screen/display APIs, persistence, security policy, and IPC handlers.
- **Preload:** exposes a minimal `window.pets` API through `contextBridge`; it never exposes raw Electron or Node APIs.
- **Renderer:** contains React presentation and user interactions. It has no direct filesystem, shell, credential, or network authority.
- **Utility/background work:** future expensive indexing or provider work belongs in dedicated workers or utility processes.

## Current components

### Renderer

The renderer provides the Window and Settings screens, window controls, debug overlay, FPS measurement, and accessibility labels. The shell uses CSS `-webkit-app-region` declarations for drag behavior while excluding controls from drag regions.

### Main

The main process creates the transparent, frameless, always-on-top window; manages tray restore and quit behavior; handles display changes, snapping, click-through state, persisted bounds, and DPI status.

### Preload

The preload bridge provides versioned app-information and window-engine methods plus validated state subscriptions. Responses are checked against shared schemas before reaching React.

### IPC

IPC channels are named constants. Requests are validated at the main boundary and results use discriminated success/error unions. New channels must be registered in the main composition root and exposed through the narrow preload bridge.

### Shared contracts

`app/src/shared` contains Zod schemas, inferred types, channel names, and error codes. It must remain independent of Electron and React.

## Folder structure

```text
app/
  src/main/       Electron lifecycle, IPC, window engine, security, diagnostics
  src/preload/    contextBridge API
  src/renderer/   React UI and styles
  src/shared/     contracts and errors
  tests/          unit and integration tests
docs/             project guides and ADRs
```

## Data flow

1. A renderer control calls a typed preload method.
2. Preload invokes a named IPC channel and validates the returned result.
3. Main validates the request, applies permission/policy checks, invokes the window service, and returns a typed result.
4. Window state changes publish sanitized snapshots to subscribed renderer listeners.
5. Size and position are persisted locally with safe fallback when state is unavailable or invalid.

## Security model

- `contextIsolation`, sandboxing, disabled Node integration, and restrictive CSP are baseline settings.
- Navigation, new windows, webviews, and session permission requests are denied by default.
- Renderer input, persisted files, and future external provider data are untrusted.
- Secrets must never travel through renderer state or diagnostic logs.
- Consequential future actions require explicit permission and confirmation in main.

