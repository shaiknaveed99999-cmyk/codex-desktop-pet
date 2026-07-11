# Release Guide

## Versioning

Use Semantic Versioning. Increment patch versions for compatible fixes, minor versions for approved features, and major versions for breaking contracts or migrations. Keep `package.json`, release notes, and Git tags aligned.

## Build process

From `app/`:

```powershell
npm ci
npm run lint
npm run typecheck
npm test
npm run build
```

The Windows package is produced by electron-builder as an NSIS installer and an unpacked directory.

## Packaging

The current internal package reuses the installed Electron runtime and disables executable editing/signing for restricted environments. Public release must enable code signing, provide a branded icon, and validate the installer on a clean Windows machine.

## Tagging

Create an annotated tag only after approval and a clean validation run:

```powershell
git tag -a v0.1.0 -m "Sprint 1 Complete"
git push origin v0.1.0
```

Use the actual approved version and message for later releases. Do not retag a published release.

## Release checklist

- [ ] Sprint and architecture approval recorded.
- [ ] Working tree clean and branch merged or approved.
- [ ] Lint, typecheck, tests, build, and packaged smoke pass.
- [ ] Known issues and deferred work reviewed.
- [ ] Version, changelog, installer, and tag agree.
- [ ] Code-signing and artifact integrity verified for public distribution.
- [ ] Rollback owner and previous known-good artifact identified.

## Rollback process

Stop distribution of the affected artifact, mark the release as withdrawn, restore the previous known-good installer/update channel, and preserve logs and the failing artifact for investigation. Fix forward on a new version; never overwrite a published tag.

