# Task 05: Express App & Server Entry Point

## Objective
Create the Express application with middleware and a health endpoint.

## Prerequisites
- Task 04 completed

## Files to Create
1. `server/src/app.ts` — Express app setup with CORS, JSON, logging, routes, error handler
2. `server/src/index.ts` — Entry point, listen on port
3. `server/src/routes/index.ts` — Route aggregator with health endpoint

## Validation
- [ ] `cd server && npm run dev` starts without errors
- [ ] `curl http://localhost:3001/api/health` returns 200
