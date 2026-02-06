# HR Hero — Project Rules

## Overview

HR Hero is a comedic fake HR platform for MEGACORP INDUSTRIES, a soulless corporate megacorp that employs superheroes. The app pulls ~730 heroes from the SuperHero API, stores them in PostgreSQL, and uses Claude AI (Haiku) to match heroes to corporate job positions with hilariously corporate reasoning blurbs.

**Tone:** Painfully corporate, humdrum, and self-aware. Think TPS Reports meets the Justice League. All copy, AI prompts, and placeholder text should be written in the voice of a soulless HR department that treats superheroes as "human capital assets."

**Design:** City of Heroes / Freedom Force inspired — Gold and Silver Age comics aesthetic applied to corporate HR software. Metallic blue thick borders, heroic gold accents, bright colors, skyline silhouettes.

## Tech Stack

### Client (`client/`)
- React 18 with TypeScript (strict mode)
- Vite (build tool + dev server on port 5173)
- Tailwind CSS (custom heroic corporate theme)
- React Router v6 (client-side routing)
- TanStack Query (server state management)
- Axios (HTTP client)
- Google Fonts: Bangers, Oswald, Inter

### Server (`server/`)
- Node.js with TypeScript (strict mode)
- Express.js (REST API on port 3001)
- Prisma ORM (PostgreSQL)
- Anthropic SDK (Claude Haiku for AI matching)
- Zod (runtime validation)

### Database
- PostgreSQL
- Models: Hero, Position, HeroPositionMatch
- Prisma manages all migrations and schema

### External APIs
- SuperHero API (superheroapi.com) — hero data source (~731 heroes)
- Anthropic Claude API (Haiku model) — AI matching and personality summaries

## Directory Structure

```
hr_hero/
├── CLAUDE.md              # This file
├── .env.example           # Environment variable template
├── core_commands/         # Workflow command templates
├── requests/              # Standalone task plans
├── plans/                 # Feature-level plans
├── server/                # Express + Prisma backend
│   ├── prisma/            # Schema, migrations, seed
│   └── src/
│       ├── config/        # Environment config (Zod validated)
│       ├── lib/           # Singletons (Prisma, Anthropic, SuperHero API)
│       ├── routes/        # Express route definitions
│       ├── controllers/   # Request handlers
│       ├── services/      # Business logic (hero, position, match, ai)
│       ├── middleware/     # Error handling, async wrapper
│       └── types/         # Shared TypeScript types
└── client/                # React + Vite frontend
    └── src/
        ├── components/    # Organized by domain (layout, heroes, positions, matches, ui)
        ├── pages/         # Route-level page components
        ├── hooks/         # TanStack Query hooks + utilities
        ├── lib/           # API client, constants
        └── types/         # Client-side TypeScript types
```

## Coding Conventions

### TypeScript
- Strict mode enabled in both client and server tsconfigs
- No `any` types — use `unknown` and narrow, or define proper types
- Prefer interfaces for object shapes, types for unions/intersections
- Export types from dedicated `types/index.ts` files
- Use const assertions where appropriate

### Server
- Controllers handle request/response only — delegate logic to services
- Services contain business logic and database queries
- All async route handlers wrapped with `asyncHandler` middleware
- Throw custom error classes (NotFoundError, BadRequestError, ServiceUnavailableError)
- Global error handler catches all errors and returns consistent JSON
- Environment variables validated at startup with Zod — fail fast on missing vars
- Prisma client is a singleton from `lib/prisma.ts`

### Client
- One component per file, named export matching filename
- TanStack Query for ALL server state — no manual useEffect+fetch patterns
- Custom hooks in `hooks/` for each API endpoint
- Tailwind for all styling — no inline styles, no CSS modules
- Loading, error, and empty states on every data-driven component
- Broken image fallbacks on all hero images

### API Design
- RESTful endpoints under `/api/`
- Cursor-based pagination for heroes (not offset-based)
- Consistent error response shape: `{ error: string, message: string, statusCode: number }`
- AI-generated results cached in database — generate once, serve from cache

### AI Prompts
- System prompt establishes "MEGACORP INDUSTRIES HR system" persona
- All AI outputs use painfully corporate language (synergy, leverage, human capital)
- JSON-only responses for matching (no markdown wrapping)
- Personality summaries are plain text (no JSON)
- Temperature 0.7 for creative variety

## Environment Variables

```
DATABASE_URL=postgresql://user:pass@localhost:5432/hr_hero
SUPERHERO_API_TOKEN=<from superheroapi.com>
ANTHROPIC_API_KEY=<sk-ant-...>
PORT=3001
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

## Validation Commands

```bash
# Server type check
cd server && npx tsc --noEmit

# Client type check
cd client && npx tsc --noEmit

# Prisma schema validation
cd server && npx prisma validate

# Client production build
cd client && npm run build
```

## Database Commands

```bash
# Run migrations
cd server && npx prisma migrate dev

# Seed database (heroes + positions)
cd server && npm run db:seed

# Reset database (drop + migrate + seed)
cd server && npx prisma migrate reset

# Open Prisma Studio (visual DB browser)
cd server && npx prisma studio
```

## Development

```bash
# Start server (port 3001)
cd server && npm run dev

# Start client (port 5173, proxies /api to server)
cd client && npm run dev
```
