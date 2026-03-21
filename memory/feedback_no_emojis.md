---
name: no_emojis
description: Never use emojis in the app UI unless the user explicitly asks
type: feedback
---

Never use emojis in any UI code (components, pages, schemas, copy). Use lucide-react icons or text instead.

**Why:** User explicitly requested removal of all emojis from the web app.

**How to apply:** Any time writing JSX/TSX — use lucide icons for decorative elements, not emoji characters. This applies to: labels, headings, tile options, logos, onboarding text, everything.
