# Task 06: SuperHero API Integration & Database Seeding

## Objective
Build the SuperHero API fetch utility and create a seed script that populates the database with ~731 heroes and 28 corporate positions.

## Prerequisites
- Task 05 completed
- SuperHero API token in `.env`

## Files to Create
1. `server/src/lib/superheroApi.ts` — Fetch and parse heroes from SuperHero API
2. `server/prisma/seed.ts` — Seed script for heroes and 28 positions

## Validation
- [ ] `cd server && npm run db:seed` completes
- [ ] ~700+ heroes in database
- [ ] 28 positions in database
- [ ] Seed is idempotent (running again doesn't duplicate)
