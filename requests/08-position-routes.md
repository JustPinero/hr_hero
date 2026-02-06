# Task 08: Position Service & API Routes

## Objective
Build position list and detail API endpoints with optional filters.

## Prerequisites
- Task 06 completed

## Files to Create
1. `server/src/services/position.service.ts` — getPositions, getPositionById
2. `server/src/controllers/positions.controller.ts` — listPositions, getPosition
3. `server/src/routes/positions.ts` — GET /, GET /:id

## Validation
- [ ] `GET /api/positions` returns all 28 positions
- [ ] `GET /api/positions?department=SECURITY` filters correctly
- [ ] `GET /api/positions/1` returns full position detail
- [ ] `GET /api/positions/99999` returns 404
