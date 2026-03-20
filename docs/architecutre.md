# Shark — Architecture

## Overview

Shark is a full-stack TypeScript application built with a monolithic architecture (v1).

---

## Stack

Frontend + Backend:
- Next.js (App Router)
- TypeScript
- Tailwind + shadcn/ui

Backend services:
- Supabase (Postgres, Auth, Storage)

AI:
- OpenAI (Responses API)
- Vercel AI SDK

Infra:
- Vercel

Payments:
- Stripe

Analytics:
- PostHog

Email:
- Resend

---

## Architecture Style

- monolith (Next.js)
- server-driven logic
- API routes + server actions
- Supabase as primary data layer

---

## High-Level Flow

### Report Generation

1. User submits intake
2. Server action triggers OpenAI
3. AI returns structured JSON
4. Save to DB
5. UI renders report

---

### Billing

1. User clicks upgrade
2. Redirect to Stripe Checkout
3. Stripe webhook updates subscription
4. DB updates user plan
5. App enforces limits

---

## Key Layers

### UI Layer
- pages
- components
- forms

### Application Layer
- server actions
- API routes
- business logic

### Data Layer
- Supabase (Postgres)
- typed queries

### External Services
- OpenAI
- Stripe
- PostHog
- Resend

---

## Key Principles

- keep server-side logic centralized
- avoid client-side secrets
- minimal abstraction early
- scale only when needed

---

## Future Extensions

- background job queue
- vector search (pgvector)
- multi-tenant org system
- API layer (if needed)