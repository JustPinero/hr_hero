# HR Hero

HR Hero is a comedic fake HR platform for **MEGACORP INDUSTRIES**, a soulless corporate megacorp that employs superheroes. The app pulls ~730 heroes from the SuperHero API, stores them in PostgreSQL, and uses Claude AI (Haiku) to match heroes to corporate job positions with hilariously corporate reasoning blurbs.

## Tech Stack

### Client
- React 18 + TypeScript (strict mode)
- Vite (dev server on port 5173)
- Tailwind CSS (custom heroic corporate theme)
- React Router v6
- TanStack Query
- Axios

### Server
- Node.js + TypeScript (strict mode)
- Express.js (REST API on port 3001)
- Prisma ORM (PostgreSQL)
- Anthropic SDK (Claude Haiku)
- Zod (runtime validation)

### External APIs
- SuperHero API — hero data source (~731 heroes)
- Anthropic Claude API — AI matching and personality summaries

## Setup

### Prerequisites
- Node.js 18+
- PostgreSQL
- SuperHero API token (from superheroapi.com)
- Anthropic API key

### Installation

1. Clone the repo and create your `.env` from the example:
   ```bash
   cp .env.example server/.env
   ```

2. Install dependencies:
   ```bash
   cd server && npm install
   cd ../client && npm install
   ```

3. Set up the database:
   ```bash
   cd server
   npx prisma migrate dev
   npm run db:seed
   ```

4. Start development:
   ```bash
   # Terminal 1: Server (port 3001)
   cd server && npm run dev

   # Terminal 2: Client (port 5173)
   cd client && npm run dev
   ```

5. Visit `http://localhost:5173`

## Project Structure

```
hr_hero/
├── server/           # Express + Prisma backend
│   ├── prisma/       # Schema, migrations, seed
│   └── src/
│       ├── config/   # Environment config
│       ├── lib/      # Singletons (Prisma, Anthropic, SuperHero API)
│       ├── routes/   # Express route definitions
│       ├── controllers/  # Request handlers
│       ├── services/     # Business logic
│       ├── middleware/   # Error handling
│       └── types/        # Shared TypeScript types
└── client/           # React + Vite frontend
    └── src/
        ├── components/   # UI components by domain
        ├── pages/        # Route-level pages
        ├── hooks/        # TanStack Query hooks
        ├── lib/          # API client, constants
        └── types/        # Client-side types
```

## Key Features

- Browse ~730+ superheroes with infinite scroll
- View detailed hero profiles with powerstats
- Browse 28 corporate job positions
- AI-powered hero-to-position matching with comedic corporate reasoning
- AI-generated personality assessments
- All results cached in PostgreSQL after first generation
