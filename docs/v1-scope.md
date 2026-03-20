# Shark — V1 Scope

## Goal

Deliver a usable MVP that:
- validates ideas
- produces structured reports
- supports basic execution workflows
- supports monetization

---

## In Scope

### 1. Auth
- email/password login (Supabase)
- protected routes

---

### 2. Projects
- create project
- list projects
- open project workspace

---

### 3. Intake Flow
- multi-step form
- save progress
- editable

Fields:
- idea
- problem
- customer
- country
- stage
- budget
- goal

---

### 4. Report Generation
- OpenAI integration
- structured JSON output

Sections:
- executive verdict
- customer & pain
- market
- competitors
- business model
- MVP
- go-to-market
- risks
- next steps

---

### 5. Workspace
Modules:
- tasks
- milestones
- assumptions
- notes

CRUD required for each

---

### 6. Pricing / Billing
Plans:
- Free: 1 project
- Starter: 3 projects
- Pro: 10 projects

- Stripe Checkout
- webhook handling
- gating logic

---

### 7. Export
- simple summary export (HTML/PDF-friendly)

---

### 8. Basic Analytics
- PostHog events

---

## Out of Scope (v1)

- real-time collaboration
- team accounts
- advanced financial modeling
- AI agents / autonomous workflows
- full legal compliance engine
- complex RAG system

---

## Definition of Done

A user can:
1. sign up
2. create idea
3. complete intake
4. generate report
5. view report
6. create tasks
7. upgrade plan