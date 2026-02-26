# CLAUDE.md — Authoritative Technical Specification

> This file is the single source of truth for coding conventions, architecture decisions, and tooling rules in this repository. All AI agents and contributors must follow these rules. Violations should be flagged and corrected.

---

## 1. Tech Stack

### Core
| Concern | Library | Notes |
|---|---|---|
| Framework | **Next.js 15** (App Router) | No Pages Router. RSC by default. |
| UI Runtime | **React 19** | Server Components preferred |
| Language | **TypeScript 5** | strict mode, no `any` |
| Styling | **Tailwind CSS v4** | utility-first, no inline styles |

### Data & State
| Concern | Library | Notes |
|---|---|---|
| ORM | **Prisma** + pg adapter | PostgreSQL only |
| Server state | **TanStack Query v5** | `useQuery` / `useMutation` |
| Client state | **Zustand v5** | for cross-component persistent UI state |
| HTTP client | **Axios** | with typed interceptors |
| Validation | **Zod v4** | at every system boundary |
| Type-safe env | **@t3-oss/env-nextjs** | import from `@/lib/env` only |

### Auth & i18n
| Concern | Library | Notes |
|---|---|---|
| Auth | **Clerk** (`@clerk/nextjs`) | middleware handles route protection |
| i18n | **next-intl** | locale in URL segment `[locale]` |

### UI Component System
| Concern | Library | Notes |
|---|---|---|
| Primitives | **Radix UI** | unstyled, accessible |
| Base UI | **@base-ui/react** | additional primitives |
| Design system | **shadcn/ui** (custom registry) | copy-paste components in `components/ui/` |
| Icons | **Lucide React** | consistent icon set |
| Charts | **Recharts** | data visualisation |
| Rich text | **Tiptap** (`@tiptap/react`) | WYSIWYG editor |
| Markdown render | **react-markdown** + `remark-gfm` | rendering markdown content |
| Flow / diagrams | **React Flow** (`@xyflow/react`) | workflow & graph UIs |
| Drag & drop | **dnd-kit** (`@dnd-kit/core`) | sortable lists, kanban, etc. |
| Animation | **Motion** (`motion`) | page transitions, micro-interactions |
| Forms | **React Hook Form** + Zod resolver | always pair with Zod schema |
| Tables | **TanStack Table v8** | headless, virtualised when needed |

### Backend Services
| Concern | Library | Notes |
|---|---|---|
| Cache / pub-sub | **@upstash/redis** | serverless Redis; import from `@/lib/redis` |
| Rate limiting | **@upstash/ratelimit** | sliding window; import from `@/lib/redis` |
| Email | **Resend** + `@react-email/components` | import from `@/lib/email` |
| File upload | **UploadThing** | integrated with Next.js route handlers |
| Payments | **Stripe** | webhook handler in `app/api/webhooks/stripe/` |
| AI / LLM | **Vercel AI SDK** (`ai`) + `@ai-sdk/openai` | streaming responses |
| Background jobs | **Trigger.dev** (`@trigger.dev/sdk`) | async tasks, scheduled jobs |
| Server actions | **next-safe-action** | type-safe; import from `@/lib/safe-action` |

### Developer Tooling
| Tool | Purpose |
|---|---|
| **Biome** | Linting + formatting (no ESLint, no Prettier) |
| **Husky** | Git hooks |
| **lint-staged** | Run Biome on staged files only |
| **commitlint** | Enforce Conventional Commits |
| **Vitest** | Unit & integration tests |
| **Playwright** | End-to-end tests |
| **pino** | Structured server-side logging |

---

## 2. Project Structure

```
├── app/                        # Next.js App Router
│   ├── api/                    # Route Handlers
│   │   ├── webhooks/           # External webhooks (stripe, clerk, etc.)
│   │   └── uploadthing/        # UploadThing file routes
│   ├── (auth)/                 # Clerk auth pages (sign-in, sign-up)
│   ├── (dashboard)/            # Protected app routes
│   ├── [locale]/               # i18n locale wrapper
│   ├── layout.tsx              # Root layout — providers only
│   ├── globals.css             # Global CSS + Tailwind imports
│   └── shadcn.css              # shadcn/ui CSS variables
│
├── components/
│   ├── ui/                     # shadcn/ui primitives (auto-generated)
│   └── <feature>/              # Feature-specific composed components
│
├── lib/                        # Server-safe shared utilities
│   ├── env.ts                  # Type-safe env (SINGLE import point for all env vars)
│   ├── prisma.ts               # Prisma singleton
│   ├── redis.ts                # Upstash Redis + rate limiter
│   ├── email.ts                # Resend client + email helpers
│   ├── logger.ts               # Pino logger
│   ├── safe-action.ts          # next-safe-action client (authAction / action)
│   ├── stripe.ts               # Stripe client
│   ├── uploadthing.ts          # UploadThing config
│   └── utils.ts                # cn(), absoluteUrl(), etc.
│
├── hooks/                      # Client-side custom hooks (use-*.ts)
├── types/                      # Global TypeScript types (use sparingly)
├── messages/                   # next-intl translation JSON files
├── prisma/                     # Prisma schema + migrations
│   └── schema.prisma
├── registry/
│   └── styles/                 # CSS theme variants (lyra, maia, mira, nova, vega)
├── tests/
│   ├── setup.ts                # Vitest global setup
│   ├── unit/                   # Vitest unit tests (mirror src structure)
│   └── e2e/                    # Playwright E2E tests
└── .github/
    ├── workflows/              # CI (ci.yml) + CD (release.yml)
    ├── ISSUE_TEMPLATE/
    └── dependabot.yml
```

---

## 3. TypeScript Rules

### Strict Non-Negotiables
- `strict: true` — never disable compiler flags
- **No `any`** — use `unknown` + type guard, or `never` for exhaustive checks
- **No non-null assertion (`!`)** — handle the nullable case explicitly
- Every exported function must have explicit return types
- `interface` for extendable object shapes; `type` for unions, intersections, mapped types

### Import Rules
- **Always** use the `@/` path alias for internal imports
- Import order: external → internal → types (enforced by Biome)
- **Never** access `process.env` directly — always import from `@/lib/env`

### Type Colocation
- Component prop types: defined in same file, named `<ComponentName>Props`
- Server / DB types: co-located in the feature module
- Only put types in `types/` when shared across ≥ 3 unrelated modules

---

## 4. Component Architecture

### Server vs Client Split
- **Default to Server Components.** Add `"use client"` only when needed for:
  - Event handlers / interactivity
  - Browser APIs (localStorage, window, etc.)
  - React hooks (`useState`, `useEffect`, etc.)
  - Context consumers
- Push `"use client"` as far down the tree as possible — never on layouts or pages unless forced

### Component Rules
- **Named exports only** (except `page.tsx`, `layout.tsx`, `error.tsx`, `loading.tsx`)
- One component per file (small helper sub-components may live in the same file)
- Prop interfaces named `<ComponentName>Props`
- No prop drilling beyond 2 levels — use composition or Zustand
- Prefer composition over configuration (children / slots / render props)

### File Naming
| Type | Convention | Example |
|---|---|---|
| Component | `PascalCase.tsx` | `UserCard.tsx` |
| Hook | `use-kebab-case.ts` | `use-auth.ts` |
| Utility / lib | `kebab-case.ts` | `format-date.ts` |
| Route segment | lowercase | `app/(dashboard)/settings/page.tsx` |
| Test | `*.test.ts(x)` | `utils.test.ts` |
| E2E | `*.spec.ts` | `home.spec.ts` |

---

## 5. API Route Handler Rules

### URL Structure
```
app/api/<resource>/route.ts           # collection  GET, POST
app/api/<resource>/[id]/route.ts      # item        GET, PATCH, DELETE
app/api/webhooks/<service>/route.ts   # webhooks
```

### Request / Response Contract
- Parse + validate request body with Zod **before** any business logic
- Use standard HTTP status codes:
  - `200` OK, `201` Created, `400` Bad Request, `401` Unauthorized
  - `403` Forbidden, `404` Not Found, `409` Conflict, `422` Unprocessable
  - `429` Rate Limited, `500` Internal Server Error
- Always return `NextResponse.json()` — never `new Response()`
- Response envelope (enforced):
  ```ts
  // Success
  { data: T }
  // Error
  { error: { code: string; message: string; details?: unknown } }
  ```

### Server Actions
- Use **`next-safe-action`** for all server actions — never bare `"use server"` exports
- Validate with Zod schema via `.schema(z.object({...}))`
- Use `authAction` for authenticated actions, `action` for public ones
- Import clients from `@/lib/safe-action`

### Rate Limiting
- Apply `@upstash/ratelimit` to all public-facing mutation endpoints and auth routes
- Default: 10 requests / 10 seconds per IP (sliding window)
- Import rate limiter from `@/lib/redis`

---

## 6. State Management Rules

| Data Category | Tool | Rule |
|---|---|---|
| Server / async data | **TanStack Query** | Always; never store in Zustand |
| URL / filter / pagination | **nuqs** | Query string, shareable URLs |
| Form state | **React Hook Form** | Always pair with Zod schema |
| Global persistent UI state | **Zustand** | Modal state, sidebar, user prefs |
| Local ephemeral state | **useState** / **useReducer** | If not needed outside the component |

---

## 7. Database Rules (Prisma)

- Schema file: `prisma/schema.prisma` — all models defined here
- **Model naming**: `PascalCase` singular (`User`, `BlogPost`)
- **Table mapping**: always set `@@map("snake_case_plural")`
- Every model must have: `id String @id @default(cuid())`, `createdAt DateTime @default(now())`, `updatedAt DateTime @updatedAt`
- Soft deletes: add `deletedAt DateTime?` + always filter `where: { deletedAt: null }` in queries
- **No raw SQL** unless no Prisma equivalent — if required, use `prisma.$queryRaw` with tagged template literals (parameterised)
- Run migrations via `pnpm db:migrate`; never use `db:push` in production

---

## 8. Error Handling

### Pattern for Route Handlers
```ts
import { logger } from "@/lib/logger"
import { NextResponse } from "next/server"
import { ZodError } from "zod"

export async function POST(req: Request) {
  try {
    const body = RequestSchema.parse(await req.json())
    const result = await doWork(body)
    return NextResponse.json({ data: result }, { status: 201 })
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        { error: { code: "VALIDATION_ERROR", message: "Invalid input", details: err.flatten() } },
        { status: 422 }
      )
    }
    logger.error({ err }, "Unhandled route error")
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Something went wrong" } },
      { status: 500 }
    )
  }
}
```

### Rules
- **Never** expose stack traces, DB errors, or internal identifiers to clients
- **Never** silently swallow errors (empty catch blocks are forbidden)
- Client errors → `sonner` toast via TanStack Query `onError`
- Page-level unexpected errors → `error.tsx` boundary

---

## 9. Security Rules

| Rule | Detail |
|---|---|
| Env vars | Never `process.env` directly — always `@/lib/env` |
| Auth checks | Every protected route handler calls `auth()` from Clerk first |
| Input validation | Zod `.parse()` at every trust boundary |
| SQL safety | Prisma only; no string interpolation in `$queryRaw` |
| File uploads | Server-side MIME + size validation via UploadThing config |
| Webhooks | Verify signature before processing (Stripe, Clerk, Trigger.dev) |
| Rate limiting | All auth endpoints + public mutations |
| Headers | Set security headers in `next.config.ts` (`X-Frame-Options`, `CSP`, etc.) |

---

## 10. Styling Rules

- Tailwind utility classes only — avoid custom CSS except for things Tailwind cannot do
- `cn()` from `@/lib/utils` for all conditional class merging — never string concatenation
- Responsive breakpoints: **mobile-first** (`sm:` → `md:` → `lg:` → `xl:`)
- Dark mode: `dark:` prefix, controlled by `next-themes`
- Complex animations: **Motion** (`motion`) — keep `duration < 300ms` for UI feedback
- Simple enter/exit: `tailwindcss-animate` + `tw-animate-css`
- Theme tokens live in `registry/styles/` — no hard-coded brand colours in components

---

## 11. Internationalisation (i18n)

- Every user-facing string uses `useTranslations()` (client) or `getTranslations()` (server)
- Translation files: `messages/<locale>.json`
- No hard-coded English strings in components
- Date/number formatting: always `Intl` APIs or `date-fns` with locale
- URL structure: `/<locale>/...` (e.g., `/en/dashboard`, `/zh/dashboard`)

---

## 12. Logging (pino)

- Import logger from `@/lib/logger` (never `console.log` in production code)
- Log levels: `debug` (dev only), `info` (normal ops), `warn` (recoverable issues), `error` (failures)
- Always include structured context: `logger.error({ err, userId }, "Payment failed")`
- Never log sensitive data: passwords, tokens, PII

---

## 13. Testing Requirements

### Unit / Integration (Vitest)
- Test files: `tests/unit/**/*.test.ts(x)` or co-located `*.test.ts(x)`
- Every `lib/` utility must have unit tests
- Every custom hook must have tests via `renderHook`
- Coverage thresholds: **lines ≥80%, functions ≥80%, branches ≥70%**
- Mock external services (DB, Redis, Clerk, Stripe) at module level in `tests/setup.ts`

### E2E (Playwright)
- Test files: `tests/e2e/**/*.spec.ts`
- Must cover: sign-in, core user journey (happy path), critical form submissions

---

## 14. Commit & PR Rules

### Commit Format (enforced by commitlint)
```
<type>(<scope>): <subject>
```
Types: `feat` `fix` `docs` `style` `refactor` `test` `chore` `perf` `ci` `revert`

### PR Requirements
- Fill out the PR template completely
- All CI checks pass before merging
- Squash merge to `main`

---

## 15. Commands Reference

```bash
# Development
pnpm dev                  # http://localhost:3000
pnpm build && pnpm start  # production build

# Quality
pnpm lint                 # Biome check
pnpm format               # Biome format --write
pnpm typecheck            # tsc --noEmit

# Tests
pnpm test                 # Vitest watch
pnpm test:run             # Vitest single run (CI)
pnpm test:coverage        # Vitest + coverage report
pnpm test:e2e             # Playwright E2E

# Database
pnpm db:generate          # prisma generate
pnpm db:push              # prisma db push (dev only)
pnpm db:migrate           # prisma migrate dev
pnpm db:studio            # Prisma Studio GUI
```
