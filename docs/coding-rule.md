# Shark — Coding Rules

## Core Philosophy

- clarity > cleverness
- simple > abstract
- explicit > implicit

---

## General Rules

- TypeScript everywhere
- no `any`
- small, focused functions
- no premature abstraction
- avoid over-engineering

---

## File Structure

- group by feature, not by type
- keep related logic close
- avoid deep nesting

---

## Naming

- clear, descriptive names
- no abbreviations
- consistent casing

---

## Components

- keep components small
- separate UI and logic where possible
- avoid prop drilling → use hooks or context if needed

---

## Server vs Client

- default to server components
- use client components only when necessary
- keep API keys server-side only

---

## Data Access

- centralize DB access
- avoid raw queries scattered everywhere
- use typed helpers

---

## AI Integration

- prompts must be:
  - structured
  - deterministic
  - versioned if needed
- never call AI from client

---

## Error Handling

- always handle:
  - loading
  - error
  - empty states

---

## Logging

- log critical flows:
  - report generation
  - billing events
  - failures

---

## Security

- never expose secrets
- validate inputs
- enforce access control (user → project)

---

## Code Reviews (even if solo)

Before merging:
- does this scale?
- is this readable in 2 weeks?
- is there duplication?
- is this overbuilt?

---

## Anti-Patterns

- giant components
- mixed concerns (UI + business logic + DB)
- silent failures
- magic values
- deeply nested conditionals