# Shark — Data Model

## Core Entities

### profiles
- id (uuid)
- email
- created_at

---

### subscriptions
- id
- user_id
- plan (free | starter | pro)
- stripe_customer_id
- stripe_subscription_id
- status
- current_period_end

---

### projects
- id
- user_id
- name
- description
- country
- stage
- created_at
- updated_at

---

### project_inputs
- id
- project_id
- idea
- problem
- target_customer
- budget
- goal
- raw_json (flexibility)

---

### reports
- id
- project_id
- status (pending | completed | failed)
- created_at

---

### report_sections
- id
- report_id
- section_key
- content_json

---

### tasks
- id
- project_id
- title
- description
- status
- due_date

---

### milestones
- id
- project_id
- title
- target_date
- status

---

### assumptions
- id
- project_id
- description
- status (untested | validated | invalid)
- notes

---

### notes
- id
- project_id
- content
- created_at

---

## Relationships

- user → many projects
- project → one report (initially)
- project → many tasks
- project → many milestones
- project → many assumptions

---

## Design Principles

- keep schema simple
- allow JSON where structure may evolve
- avoid premature normalization
- use timestamps everywhere