# TPMS Project Planning Summary

## 1. Purpose
A high-end SaaS platform that evolves trademark “tracking” into full **practice management** by automating workflows, docketing deadlines, and linking legal actions to billing.

## 2. Tech Stack (enforced)
- **Next.js 14** (App Router, TypeScript)
- **Supabase** (Database + Auth via `@supabase/ssr`)
- **shadcn/ui** (Radix primitives) + **Tailwind CSS**
- **Cult UI** for motion effects
- **pdf-lib** for PDF automation
- **Zod** for validation

## 3. Root Directory Map
| Path | Status | Notes |
| --- | --- | --- |
| `src/` | ✅ Active | All application code lives here |
| `Management/` | 🗑️ Empty | Legacy placeholder — safe to delete |
| `Practice/` | 🗑️ Empty | Legacy placeholder — safe to delete |
| `System/` | 🗑️ Empty | Legacy placeholder — safe to delete |
| `public/` | ✅ Assets | Static files incl. PDF template |
| `cypress/` | ✅ Tests | End-to-end tests |
| `plan.md` | ✅ Task list | Sprint-level tasks (update each change) |
| `planning.md` | ✅ This file | High-level summary & onboarding |

## 4. `src/` High-Level Structure (current)
```
app/            # Route groups — (auth), (dashboard), etc.
components/     # UI + motion + shared comps
context/        # React context providers (Search, etc.)
hooks/          # Custom React hooks
lib/            # Utilities & Supabase helpers
services/       # Business-logic wrappers
types/          # Global TS types
```

## 5. Immediate Milestones
1. Supabase integration (auth + RLS)
2. CRUD services: `trademarks`, `invoices`
3. Workflow engine MVP (status → task triggers)
4. Financial invoicing module
5. Lint & formatting enforcement (`npm run lint`)

## 6. Conventions & Rules (TL;DR)
- Install **shadcn/ui** via CLI (`npx shadcn@latest add ...`).
- Copy **Cult UI** implementations exactly from docs.
- All mutations validated with **Zod**.
- Use `@/` alias for absolute imports.
- Embed **Noto Sans Ethiopic** for Amharic PDF fields.
- Run tests + lint before pushing.

## 7. Onboarding Checklist
- Clone repo & install deps.
- Copy `.env.example` to `.env.local` and set Supabase keys.
- Run `npm run dev` then `http://localhost:3000`.
- Review `planning.md` (this file) and `plan.md` for sprint tasks.

## 8. Glossary
- **Docketing**: Calendar & deadline management.
- **Office Action**: Examiner objection that requires response.
- **RLS**: Supabase Row Level Security.

---
_Last updated: 2026-01-16_
