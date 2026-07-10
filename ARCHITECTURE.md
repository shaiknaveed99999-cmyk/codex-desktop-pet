# Architecture

## Overview

Pets uses Electron's multi-process model to separate untrusted UI code from privileged desktop services. React owns application UI, PixiJS owns high-frequency companion rendering, and TypeScript contracts define every cross-boundary interaction.

```text
React UI + PixiJS companion (renderer)
        │ typed, validated preload bridge
        ▼
Electron main process
 ├─ permission and confirmation service
 ├─ behavior orchestration and context assembly
 ├─ Codex / voice / developer-integration adapters
 ├─ plugin host and capability broker
 ├─ local persistence and Windows credential vault
 └─ notifications, updates, diagnostics
```

## Layers and boundaries

### Renderer

The renderer contains React routes, feature view models, dashboard views, settings, and the PixiJS stage. It communicates only through the preload API, maintains no secrets, and treats all returned values as data to display or validate.

### Preload bridge

The preload layer is a narrow, versioned façade. It exposes capability-specific methods and subscriptions, serializes supported data only, and never exposes `ipcRenderer`, Node globals, or Electron internals.

### Main process

The main process owns application lifecycle and all privileged services. It validates IPC schemas, decides permission grants, invokes adapters, persists data, schedules safe background work, and forwards only sanitized events to the renderer.

### Shared contracts

`src/shared` contains schemas, domain types, error codes, event names, and pure business rules used by both processes. It may not import Electron, React, PixiJS, or provider SDKs.

## Core subsystems

| Subsystem | Responsibility | Boundary |
| --- | --- | --- |
| Companion engine | Converts behavior intents into animation state, scene updates, and interaction events. | Renderer; consumes typed behavior events. |
| Behavior engine | Selects safe companion behavior from user intent, app state, policies, and approved context. | Main service with pure planning core. |
| Codex adapter | Auth, request streaming, tool/action proposals, cancellation, and normalized errors. | Main only; mediated by permission service. |
| Voice service | Device permission, capture session, transcription/synthesis adapters, retention policy. | Main; renderer receives safe state and transcript events. |
| Plugin host | Validates manifests, grants capabilities, loads isolated plugins, manages lifecycle. | Main; no ambient authority. |
| Integration hub | Normalizes developer-provider data/events and isolates provider-specific SDKs. | Main adapter boundary. |
| Persistence | Stores preferences, cache, audit records, and migrations; delegates credentials to Windows vault. | Main only. |

## Security and consent flow

1. A renderer feature requests a named capability through preload.
2. Main validates the schema, current permission grant, plugin/integration identity, and policy.
3. If the operation is consequential or sends new context externally, main requests an explicit renderer confirmation containing a human-readable summary.
4. After approval, the adapter executes with the smallest necessary scope.
5. Main records a redacted audit event and returns a typed result.

## Plugin model

Plugins declare identity, publisher, version, required API version, requested capabilities, UI contributions, and integrations in a validated manifest. Installation verifies integrity and publisher trust. The plugin host supplies capability-scoped RPC methods, quotas, cancellation, and lifecycle events. Plugins cannot import Electron APIs, access arbitrary filesystem locations, or obtain credentials directly.

## Performance strategy

- Run rendering on PixiJS's ticker and cap or pause work when the window is hidden or the companion is idle.
- Keep React updates separate from per-frame scene updates; batch state and avoid expensive layout reads in animation paths.
- Lazy-load non-critical routes, plugin code, provider SDKs, and large assets.
- Use worker threads or utility processes for expensive parsing, indexing, and non-UI computation.
- Instrument startup, IPC latency, renderer frame time, memory, and plugin execution duration with privacy-safe local metrics.

## Data model and retention

Preferences, layout, permitted integration metadata, and redacted audit records reside in a versioned local database. Tokens and secrets use Windows Credential Manager. Voice recordings are off by default and, when enabled, have a configured retention period. Users can inspect, export, and delete local data from Settings.

## Architectural invariants

- No privileged operation bypasses the main-process permission service.
- No plugin has ambient authority.
- All IPC and plugin messages use versioned, validated contracts.
- The application remains usable without network access; network-dependent features report degraded state clearly.
- Animation and AI behavior can be paused or reduced without breaking core navigation or accessibility.

