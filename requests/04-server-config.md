# Task 04: Server Configuration & Shared Utilities

## Objective
Create the server's configuration layer, client singletons, shared types, and error handling middleware.

## Prerequisites
- Task 03 completed

## Files to Create
1. `server/src/config/env.ts` — Zod-validated environment variables
2. `server/src/lib/prisma.ts` — Prisma client singleton
3. `server/src/lib/anthropic.ts` — Anthropic SDK client singleton
4. `server/src/types/index.ts` — All shared TypeScript types
5. `server/src/middleware/asyncHandler.ts` — Async route handler wrapper
6. `server/src/middleware/errorHandler.ts` — Custom error classes + global error handler

## Validation
- [ ] All files compile: `cd server && npx tsc --noEmit`
