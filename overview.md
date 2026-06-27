# Workspace

Created by Aslam Baig (7387292087), Designed by Aslam7387292087.

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

- `artifacts/portfolio` — Mirza Aslam Baig's personal AI portfolio + ecosystem dashboard (react-vite, single-page, dark-first, frontend-only). Data-driven: all content lives in `src/data/` (personalInfo, projects, courses, experience, achievements, systems, learningPath, socialLinks, qrLinks, **resume**). Sections: Hero (with floating stat badges + specialty chips), Projects, Skills, CurrentRole (TWG International), Courses (categorized: Core/Specialization/Modular with tabs filter), LearningPath (Beginner→Expert progression), Experience, TeachingPhilosophy, Innovation (AI Systems), Ongoing, Upcoming, Documents (single ATS-optimized resume generated on demand via `src/lib/generateResume.ts` using jsPDF — no PDFs shipped), SocialEcosystem (GitHub/YouTube/Instagram/Facebook + QR codes for Portfolio/YouTube/WhatsApp), Chatbot, Contact. Chatbot falls back to a local rule-based responder; set `VITE_N8N_WEBHOOK_URL` to connect it to an n8n webhook later. **Privacy hard rule**: phone (`+91 7387292087`) and email (`mbaslambaig9@gmail.com`) live ONLY in `src/data/personalInfo.ts` and are exposed only inside Contact.tsx's blur+reveal dialog. Location: Old City, Hyderabad, India. WhatsApp: https://wa.me/917387292087. The previously-used secondary phone `+91 9423292087` has been fully removed. QR codes generated client-side via `qrcode` package; resume PDF generated client-side via `jspdf`.

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
