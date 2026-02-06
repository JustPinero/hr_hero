# Task 07: Hero Service & API Routes

## Objective
Build hero list and detail API endpoints with cursor-based pagination, search, and filters.

## Prerequisites
- Task 06 completed

## Files to Create
1. `server/src/services/hero.service.ts` — getHeroes (paginated), getHeroById
2. `server/src/controllers/heroes.controller.ts` — listHeroes, getHero
3. `server/src/routes/heroes.ts` — GET /, GET /:id

## Validation
- [ ] `GET /api/heroes` returns 20 heroes with nextCursor
- [ ] `GET /api/heroes?search=bat` filters by name
- [ ] `GET /api/heroes/70` returns Batman
- [ ] `GET /api/heroes/99999` returns 404
