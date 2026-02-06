---
description: Execute an implementation plan
argument-hint: [path-to-plan]
allowed-tools: Read, Write, Edit, Bash(npx tsc:*), Bash(npx prisma:*), Bash(npm run:*), Bash(npm install:*), Bash(npx vite:*)
---

# Execute: Implement from Plan

## Plan to Execute

Read plan file: `$ARGUMENTS`

## Execution Instructions

### 1. Read and Understand

- Read the ENTIRE plan carefully
- Read `CLAUDE.md` for project conventions
- Note validation commands and testing strategy

### 2. Execute Tasks in Order

For EACH task:

#### a. Navigate to the task
- Identify files and actions required
- Read existing related files if modifying

#### b. Implement the task
- Follow specifications exactly
- Maintain TypeScript strict mode (no `any`)
- Follow patterns from existing code
- Use Prisma client from `server/src/lib/prisma.ts`
- Use Anthropic client from `server/src/lib/anthropic.ts`
- Use custom error classes from `server/src/middleware/errorHandler.ts`
- Wrap async handlers with `asyncHandler`

#### c. Verify as you go
- Server changes: `cd server && npx tsc --noEmit`
- Client changes: `cd client && npx tsc --noEmit`
- Schema changes: `cd server && npx prisma validate`
- After Prisma schema changes: run `npx prisma migrate dev`

### 3. Run All Validation Commands

```bash
cd server && npx tsc --noEmit
cd server && npx prisma validate
cd client && npx tsc --noEmit
cd client && npm run build
```

### 4. Final Verification

- ✅ All tasks completed
- ✅ All validation commands pass
- ✅ Code follows `CLAUDE.md` conventions

## Output Report

List completed tasks, files created/modified, validation results.
Ready for `/commit`.
