# Coding Standards

## TypeScript and React

- Use TypeScript strict mode. Do not use `any`; use `unknown` plus narrowing at trust boundaries.
- Favor immutable domain data, discriminated unions for states/results, and explicit return types on public APIs.
- Keep React components focused on presentation and interaction. Move domain logic into feature services, hooks, or shared modules.
- Use accessible native controls where possible. Every interactive element needs keyboard operation, visible focus, and an accessible name.
- Do not put privileged logic, credentials, or direct Electron APIs in renderer components.

## Electron and IPC

- Keep `contextIsolation: true`, `sandbox: true` where compatible, and `nodeIntegration: false`.
- Expose only named, minimal preload methods; validate all inputs and outputs with shared schemas.
- Main-process handlers enforce authorization and confirmation. Renderer assertions are never a security control.
- Never pass raw filesystem paths, shell commands, tokens, or unrestricted objects through IPC.

## PixiJS and animation

- Render from a deterministic state model; do not couple animation timing to React render cycles.
- Dispose textures, listeners, tickers, and containers on teardown. Pool frequently reused objects.
- Respect `prefers-reduced-motion` and the in-app motion preference; provide static or low-motion equivalents.
- Measure before optimizing; document any performance-sensitive change and benchmark it against the defined budget.

## Plugins and integrations

- Define external contracts with versioned schemas. Reject unknown required fields and fail safely on incompatible versions.
- Plugins receive only capability-scoped APIs, never direct main-process modules or ambient credentials.
- Sanitize external data, use timeouts/cancellation, and emit structured, redacted diagnostics.

## Testing and review

- Unit-test pure logic and state transitions; integration-test IPC, persistence migrations, permissions, and plugin boundaries; end-to-end test critical journeys.
- Tests must cover success, cancellation, denial, malformed input, unavailable services, and recovery paths.
- Keep commits cohesive. Reviewers verify security boundary changes, data handling, accessibility, and performance impact.

## Naming and structure

- Use `PascalCase` for React components and types; `camelCase` for functions, variables, and files except established framework conventions.
- Name files by their exported responsibility. Avoid generic `utils` modules; place helpers with their feature or shared domain.
- Keep import direction one-way: renderer/main may depend on `shared`; `shared` depends on neither.

