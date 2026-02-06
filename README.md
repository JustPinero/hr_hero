# HR Hero

**MEGACORP INDUSTRIES Talent Portal** — A comedic fake HR platform where a soulless corporate megacorp employs superheroes. Browse 730+ heroes from the SuperHero API, match them to absurd corporate job positions using Claude AI, and read hilariously corporate reasoning about why Spider-Man would make an excellent "Cold Call Specialist (Literally)."

![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)
![React](https://img.shields.io/badge/React-18-61DAFB)
![Express](https://img.shields.io/badge/Express-5-000000)
![Prisma](https://img.shields.io/badge/Prisma-6-2D3748)
![Claude AI](https://img.shields.io/badge/Claude-Haiku-CC785C)

## Features

- **Talent Pool** — Browse 730+ superheroes with infinite scroll, search by name, and filter by publisher, alignment, or availability
- **Hero Profiles** — Detailed profiles with animated powerstats, biography, appearance, and work history
- **Corporate Positions** — 28 painfully corporate job listings across 11 departments (C-Suite, Security, IT, HR, Marketing, Sales, Research, Middle Management, Finance, Facilities, Legal)
- **AI Talent Matching** — Claude Haiku analyzes hero stats and backgrounds to match them to positions with comedic corporate reasoning ("leveraging synergies," "human capital optimization," etc.)
- **AI Personality Assessments** — On-demand AI-generated personality summaries written in soulless HR-speak
- **Smart Caching** — All AI-generated matches and summaries are cached in PostgreSQL, generated once and served from cache thereafter
- **Department Pre-Filtering** — Heroes are pre-filtered by relevant stats before AI matching (strength for Security, intelligence for IT, etc.)

## Tech Stack

### Client (`client/`)
| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| TypeScript (strict) | Type safety |
| Vite 7 | Build tool & dev server |
| Tailwind CSS 4 | Styling with custom heroic corporate theme |
| React Router v6 | Client-side routing |
| TanStack Query | Server state management |
| Axios | HTTP client |

### Server (`server/`)
| Technology | Purpose |
|---|---|
| Express 5 | REST API framework |
| TypeScript (strict) | Type safety |
| Prisma 6 | PostgreSQL ORM |
| Anthropic SDK | Claude Haiku AI integration |
| Zod | Runtime validation |

### External Services
- **SuperHero API** (superheroapi.com) — Source of ~731 hero profiles
- **Anthropic Claude API** (Haiku model) — AI matching engine & personality assessments
- **PostgreSQL** — Primary database

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL (running locally)
- [SuperHero API token](https://superheroapi.com/) (free via Facebook login)
- [Anthropic API key](https://console.anthropic.com/)

### Installation

1. **Clone and configure environment:**
   ```bash
   git clone <repo-url>
   cd hr_hero
   cp .env.example server/.env
   ```
   Edit `server/.env` with your actual credentials:
   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/hr_hero
   SUPERHERO_API_TOKEN=your_token_here
   ANTHROPIC_API_KEY=sk-ant-your_key_here
   PORT=3001
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173
   ```

2. **Install dependencies:**
   ```bash
   cd server && npm install
   cd ../client && npm install
   ```

3. **Create the database:**
   ```bash
   createdb hr_hero   # or use psql: CREATE DATABASE hr_hero;
   ```

4. **Run migrations and seed:**
   ```bash
   cd server
   npx prisma migrate dev --name init
   npm run db:seed
   ```
   Seeding fetches all 731 heroes from the SuperHero API (~2-3 minutes) and creates 28 corporate positions.

5. **Start development servers:**
   ```bash
   # Terminal 1 — Server (port 3001)
   cd server && npm run dev

   # Terminal 2 — Client (port 5173)
   cd client && npm run dev
   ```

6. **Visit** `http://localhost:5173`

## Project Structure

```
hr_hero/
├── client/                     # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── heroes/         # HeroTile, HeroGrid, HeroStats, HeroBio
│   │   │   ├── layout/         # Navbar, Footer, PageShell
│   │   │   ├── matches/        # MatchPanel, MatchTile, MatchBlurb
│   │   │   ├── positions/      # PositionTable, PositionRow, PositionBadge
│   │   │   └── ui/             # LoadingSpinner, ErrorCard, EmptyState, StatBar, Badge
│   │   ├── hooks/              # TanStack Query hooks (useHeroes, usePositionMatches, etc.)
│   │   ├── lib/                # API client (Axios), constants
│   │   ├── pages/              # Route-level pages (6 pages)
│   │   └── types/              # Client TypeScript types
│   └── vite.config.ts
├── server/                     # Express + Prisma backend
│   ├── prisma/
│   │   ├── schema.prisma       # Database schema (Hero, Position, HeroPositionMatch)
│   │   └── seed.ts             # Seeds 731 heroes + 28 positions
│   └── src/
│       ├── config/             # Zod-validated environment config
│       ├── controllers/        # Request handlers (heroes, positions, matches)
│       ├── lib/                # Singletons (Prisma, Anthropic, SuperHero API client)
│       ├── middleware/         # asyncHandler, errorHandler (AppError classes)
│       ├── routes/             # Express route definitions
│       ├── services/           # Business logic (hero, position, match, AI)
│       └── types/              # Server TypeScript types
├── CLAUDE.md                   # Project rules & conventions
└── .env.example                # Environment variable template
```

## API Endpoints

### Heroes
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/heroes` | List heroes (cursor pagination, search, filters) |
| `GET` | `/api/heroes/:id` | Hero detail |
| `GET` | `/api/heroes/:id/roles` | AI-matched positions for a hero |
| `POST` | `/api/heroes/:id/generate-summary` | Generate AI personality assessment |

### Positions
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/positions` | List all positions (optional department/status filter) |
| `GET` | `/api/positions/:id` | Position detail |
| `GET` | `/api/positions/:id/matches` | AI-matched heroes for a position |

### System
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check |

**Query parameters for `/api/heroes`:**
- `cursor` — Cursor for pagination (hero ID)
- `limit` — Results per page (default: 20)
- `search` — Search by name (case-insensitive)
- `publisher` — Filter by publisher (e.g., "DC Comics", "Marvel Comics")
- `alignment` — Filter by alignment ("good", "bad", "neutral")
- `availability` — Filter by status ("AVAILABLE", "EMPLOYED", "FREELANCE", "RETIRED")

## Pages

| Route | Page | Description |
|---|---|---|
| `/positions` | Positions | Table of 28 corporate positions with department filtering |
| `/positions/:id/matches` | Position Matches | AI-scouted hero candidates in split-panel layout |
| `/talent` | Talent Pool | Infinite scroll grid of 730+ heroes with search & filters |
| `/talent/:id` | Hero Profile | Full profile with stats, bio, AI personality assessment |
| `/talent/:id/roles` | Hero Roles | AI-matched positions for a specific hero |

## Database Models

- **Hero** — 731 heroes with powerstats, biography, appearance, work, connections, availability status, and optional AI personality summary
- **Position** — 28 corporate positions across 11 departments with comedic descriptions, salary ranges, clearance levels
- **HeroPositionMatch** — Junction table caching AI-generated matches (score 0-100 + reasoning blurb). Compound unique on `[heroId, positionId]`

## How AI Matching Works

1. **Pre-filter**: When matching heroes to a position, the system first queries the top 30 heroes sorted by department-relevant stats (e.g., strength/combat for Security, intelligence for IT)
2. **AI analysis**: The filtered candidates are sent to Claude Haiku with the position details. The AI responds with scored matches and comedic corporate reasoning
3. **Cache**: Results are stored in `HeroPositionMatch` table. Subsequent requests serve from cache instantly

The AI operates as "MEGACORP INDUSTRIES' AI Talent Matching Engine" — speaking in painfully corporate HR language while treating superheroes as "human capital assets."

## Available Scripts

### Server (`cd server`)
```bash
npm run dev          # Start dev server with hot reload (nodemon + tsx)
npm run build        # Compile TypeScript to dist/
npm run start        # Run compiled server
npm run db:migrate   # Run Prisma migrations
npm run db:seed      # Seed heroes + positions
npm run db:reset     # Reset database (drop + migrate + seed)
npm run db:studio    # Open Prisma Studio (visual DB browser)
npm run typecheck    # TypeScript type check
npm test             # Run server tests
```

### Client (`cd client`)
```bash
npm run dev          # Start Vite dev server
npm run build        # Production build
npm run preview      # Preview production build
npm run typecheck    # TypeScript type check
npm test             # Run client tests
```

## Design

The visual design draws from **City of Heroes / Freedom Force** — Gold and Silver Age comics aesthetic applied to corporate HR software:
- Metallic blue thick borders and backgrounds
- Heroic gold accents and CTAs
- Comic-book inspired fonts (Bangers for display, Oswald for headings, Inter for body)
- Corporate gray underpinning for that authentic "soulless megacorp" feel
- Department-specific color coding across 11 departments

## License

This project is for educational and portfolio purposes. Superhero data is sourced from the [SuperHero API](https://superheroapi.com/). Hero images are property of their respective publishers.
