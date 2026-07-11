# Development Guide

## Prerequisites

- Windows 10/11 x64 development machine.
- Node.js 20–24 and npm.
- Git with access to the repository.
- A local Electron runtime installed through `npm ci`.

## Installation

```powershell
cd C:\Users\Naveen Shaik\Downloads\github\codex-desktop-pet\app
npm ci
```

## Build

```powershell
npm run build:bundle   # TypeScript + Vite bundles
npm run build          # Bundle plus Windows NSIS package
```

The packaged installer is written to `app/release/<version>/`.

## Run

```powershell
npm run dev
```

Development starts Vite and the Electron shell. Close the app or terminate the development process tree when finished.

## Testing and linting

```powershell
npm run lint
npm run typecheck
npm test
```

Run all three before opening a pull request. See [TestingGuide.md](TestingGuide.md) for scope and manual checks.

## Branch strategy

- `main` and `develop` are integration branches.
- Use `feature/<short-name>` for sprint work.
- Keep one coherent concern per branch and rebase or merge from the current integration branch before review.
- Do not begin the next sprint on an unapproved feature branch.

## Commit conventions

Use imperative, scoped messages such as `feat: add window state persistence`, `fix: normalize IPC errors`, or `docs: update release guide`. Keep commits small and explain behavior changes in the body when needed.

## Pull request workflow

1. Update the relevant task and documentation.
2. Run lint, typecheck, tests, build, and applicable smoke checks.
3. Describe scope, risks, validation, and deferred work.
4. Request architecture/reviewer approval before merging.
5. Merge only after required checks pass and the sprint gate is approved.

