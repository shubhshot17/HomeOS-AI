## Purpose

This file gives concise, repository-specific guidance to AI coding agents so they can be productive immediately. Focus on the App Router structure, theming, UI primitives, and the AI integration used for recipe generation.

## Quick run / developer commands

- Use pnpm if available (this repo contains `pnpm-lock.yaml`). Typical scripts (from `package.json`):
  - `pnpm dev` — runs `next dev` for local development
  - `pnpm build` — runs `next build` for production build
  - `pnpm start` — runs `next start`
  - `pnpm lint` — runs `eslint .`

If `pnpm` isn't installed, `npm` or `yarn` can run the same scripts, but prefer `pnpm` for the lockfile.

## Big picture architecture

- Next.js (App Router) application. Top-level entry is `app/layout.tsx` which renders the HTML root and includes Vercel Analytics.
- UI primitives and design system live under `components/ui/*`. Reusable building blocks (Button, Card, Input, etc.) are wrapped there and imported via `@/components/ui/...`.
- Page-level and feature components live under `components/` (e.g. `components/recipe-suggester-section.tsx`, `components/home-header.tsx`). Many are client components and explicitly use "use client".
- Server API routes live under `app/api/*` — the AI integration is implemented at `app/api/recipes/route.ts`.

## Where to change AI behaviour

- Primary LLM prompt lives in: `app/api/recipes/route.ts`.
  - The route constructs a prompt and calls Google Gemini's generative API.
  - It expects JSON request body with `{ ingredients, apiKey? }` (see `recipe-suggester-section` which POSTs `{ ingredients }`).
  - It returns `{ recipes }` where each recipe has shape: `{ name, ingredients: string[], instructions: string[], cookTime, cuisine? }`.
  - Environment variable: `GEMINI_API_KEY` is required for production; the route will also accept an `apiKey` in the request body if present.

## Data shapes / examples (from code)

- Client POST (from `components/recipe-suggester-section.tsx`):
  - fetch("/api/recipes", { method: "POST", body: JSON.stringify({ ingredients }) })
- Response JSON (what the UI expects):
  - `{ recipes: [ { name: string, ingredients: string[], instructions: string[], cookTime: string, cuisine?: string }, ... ] }`

## Project-specific conventions

- Client vs Server: Components that rely on browser state or hooks include a top-line `"use client"`. Keep server-only code (database/secret usage) in `app/api/*` or server components.
- Imports: alias `@/components/...` is used throughout for local components. Keep that pattern.
- Styling: Tailwind is used project-wide. UI components pass Tailwind classes; many components use gradients and utility classes for hover/transition.
- UI primitives: prefer using components from `components/ui/*` (Card, Button, Input). This centralization ensures consistent styling and ARIA behavior.

## Integrations and important packages

- Gemini / Google generative API: called directly from `app/api/recipes/route.ts`.
- AI SDKs present in package.json (`@ai-sdk/openai` and `ai`) but the codebase currently uses Gemini via fetch.
- Analytics: `@vercel/analytics` is included and initialized in `app/layout.tsx`.

## Debugging hints

- To reproduce UI flows locally: run `pnpm dev` and open http://localhost:3000.
- To test the recipe endpoint without a key, you can POST `{ ingredients: "eggs, rice" , apiKey: "<KEY>" }` to `/api/recipes` when running locally.
- Log statements are present in the API route (e.g., errors are logged with `console.error('[v0] ...')`). Use those markers when searching logs.

## Do / Don't

- DO keep secrets out of commits — use `process.env.GEMINI_API_KEY` for production keys.
- DO edit prompts in `app/api/recipes/route.ts` when changing assistant behavior. Keep the expected JSON output format stable (the front-end JSON parsing is simplistic and looks for a JSON array in the returned text).
- DON'T change the client fetch path (`/api/recipes`) unless you update both the component in `components/recipe-suggester-section.tsx` and the API route.

## Where to look for examples

- UI usage: `components/recipe-suggester-section.tsx` — client state, fetch to API, rendering `recipes` array.
- Theming: `components/theme-provider.tsx` — wrapper around `next-themes`.
- API patterns: `app/api/recipes/route.ts` — request parsing, prompt construction, external API call, JSON extraction.

If anything here is unclear or you want more details (e.g., where tests would go, or adding a local stub for Gemini responses), tell me which area to expand and I will update this file.
