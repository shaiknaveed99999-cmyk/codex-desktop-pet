# ADR-005: Git Workflow and Sprint Approval Strategy

- **Status:** Accepted
- **Date:** 2026-07-10

## Context

The project is delivered in small approved sprints, and architecture or security changes must be reviewable without accidentally starting future scope.

## Decision

Use `feature/<name>` branches, small imperative scoped commits, annotated release tags, and an explicit approval gate at the end of each sprint. Documentation and validation must be updated before approval; the next sprint starts only after approval.

## Consequences

The workflow creates clear audit points and rollback boundaries. It adds a deliberate pause between implementation and the next sprint, which is appropriate for security-sensitive desktop software.

