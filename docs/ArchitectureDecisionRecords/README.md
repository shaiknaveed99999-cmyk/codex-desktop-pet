# Architecture Decision Records

Architecture Decision Records (ADRs) capture significant technical decisions, their context, and their consequences. They make reasoning discoverable for future contributors and prevent repeated debates.

## Naming convention

Use `ADR-NNN-Short-Title.md`, where `NNN` is a zero-padded sequence. Keep the title stable after publication. A superseding decision links to the record it replaces.

## Standard format

Every ADR contains:

- **Status:** Proposed, Accepted, Superseded, or Rejected.
- **Date:** decision date in ISO format.
- **Context:** the problem and constraints.
- **Decision:** the chosen approach.
- **Consequences:** benefits, trade-offs, and follow-up work.

## Writing future ADRs

Keep decisions focused, document alternatives when they materially influenced the choice, and update the ADR when the decision is superseded. Do not use ADRs for ordinary implementation notes or transient task status.

