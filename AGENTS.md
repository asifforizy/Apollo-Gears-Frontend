# AGENTS.md - Apollo Gear Frontend

## Quick Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # ESLint (Next.js core-web-vitals + TypeScript rules)
npm run typecheck    # tsc --noEmit
npm run format       # Prettier (no semicolons, double quotes, tailwind plugin)
```

**Order matters:** `lint -> typecheck -> build` before committing.

## Architecture

- **Next.js 16 App Router** with route groups for layout separation
- **Backend API:** `https://apollo-gears-backend.onrender.com`
- **JWT auth** via httpOnly cookies (`accessToken`, `refreshToken`)
- **shadcn/ui** (base-maia style) + Tailwind CSS 4 + Framer Motion

### Route Groups

| Group | Purpose | Auth Required | Role Required |
|-------|---------|---------------|---------------|
| `(auth)` | Login/signup pages | No | - |
| `(publicRoute)` | Home, cars listing | No | - |
| `admin/` | Admin dashboard | Yes | admin |
| `driver/` | Driver portal | Yes | driver |
| `(dashboardRoute)` | User dashboard | Yes | user |

### Key Directories

- `app/(auth)/_actions/` - Server actions (login)
- `app/(auth)/_components/` - Auth-specific components
- `components/ui/` - shadcn/ui components
- `components/shared/` - Shared components (Navbar)
- `components/page/` - Page-specific components
- `service/` - Server-side services (token refresh)
- `utils/` - Utilities (JWT verification)
- `lib/utils.ts` - `cn()` helper for Tailwind classes

## Environment Variables

Required (`.env.local`):
- `ACCESS_TOKEN_SECRET` - JWT secret for access token verification
- `BACKEND_API_URL` - Backend API URL (used in `service/refreshToken.ts`)

## Code Conventions

- **Prettier:** No semicolons, double quotes, 2-space indent, trailing commas (es5)
- **Imports:** Use `@/` path alias (maps to project root)
- **Components:** `"use client"` directive required for client components
- **Server Actions:** `"use server"` directive, placed in `_actions/` directories
- **Styling:** Use `cn()` from `@/lib/utils` for conditional classes

## Auth Flow

1. Login action (`app/(auth)/_actions/auth.ts`) calls backend API
2. Sets httpOnly cookies: `accessToken` (24h), `refreshToken` (7d)
3. Proxy (`proxy.ts`) verifies JWT and checks role-based access
4. Token refresh via `service/refreshToken.ts` server action

### Role-Based Routing

Proxy enforces role-based access:
- **admin** → `/admin/*`
- **driver** → `/driver/*`
- **user** → `/dashboard/*`

Unauthorized access redirects to the user's default dashboard.

## Gotchas

- **JWT verification:** Uses `jsonwebtoken` library (not Web Crypto API)
- **Backend calls:** Some pages fetch directly from backend URL (not via proxy)
- **Route params:** Use `params: Promise<{ id: string }>` (Next.js 16 async params)

## Adding shadcn/ui Components

```bash
npx shadcn@latest add <component-name>
```

Components install to `components/ui/`. Import as `@/components/ui/<name>`.
