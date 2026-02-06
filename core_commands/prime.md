---
description: Prime agent with codebase understanding
---

# Prime: Load HR Hero Project Context

## Objective

Build comprehensive understanding of the HR Hero codebase by analyzing structure, documentation, and key files.

## Process

### 1. Read Global Rules

Read CLAUDE.md for project rules, conventions, and stack details.

### 2. Analyze Project Structure

List all tracked files:
!`git ls-files`

Show directory structure:
!`tree -L 3 -I 'node_modules|__pycache__|.git|dist|build|.prisma'`

### 3. Read Core Documentation

- Read `CLAUDE.md` (project rules and conventions)
- Read `README.md`
- Read `server/prisma/schema.prisma` (data model)
- Read `client/tailwind.config.ts` (design system)

### 4. Identify Key Files

Read the following entry points:
- `server/src/index.ts` (server entry)
- `server/src/app.ts` (Express setup)
- `client/src/App.tsx` (client entry with routes)
- `server/src/services/ai.service.ts` (AI prompts)

### 5. Check Database State

!`cd server && npx prisma studio` (or describe current migration state)

### 6. Understand Current State

!`git log -10 --oneline`
!`git status`

## Output Report

### Project Overview
- HR Hero: Comedic corporate HR platform for superheroes
- Stack: React 18/TS/Vite/Tailwind (client), Express/TS/Prisma/PostgreSQL (server), Claude Haiku (AI)

### Architecture
- Client and server are separate directories
- Prisma schema defines Hero, Position, HeroPositionMatch models
- AI matching uses two-pass strategy (pre-filter + Claude Haiku)
- Cursor-based pagination for heroes, no pagination for positions

### Current State
- Active branch and recent changes
- Database seed status
- Any open issues or in-progress work
