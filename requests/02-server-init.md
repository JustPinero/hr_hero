# Task 02: Server Project Initialization

## Objective
Initialize the Node.js + TypeScript server project with all dependencies.

## Context
The server lives in `server/` and uses Express + TypeScript + Prisma. This task creates the project skeleton and installs all packages. No source code yet — just project config.

## Prerequisites
- Task 01 completed (root config exists)

## Files to Create

### 1. `server/package.json`
Initialize with `npm init -y` in `server/` directory, then configure.

**Dependencies:** express, @prisma/client, @anthropic-ai/sdk, cors, zod, dotenv
**Dev Dependencies:** typescript, @types/express, @types/cors, @types/node, tsx, nodemon, prisma

**Scripts:** dev, build, start, db:migrate, db:seed, db:reset, db:studio, typecheck

### 2. `server/tsconfig.json`
Strict mode, ES2022 target, commonjs module.

### 3. `server/nodemon.json`
Watch src, exec with tsx.

### 4. `server/.env.example`

## Validation
- [ ] `cd server && npm install` completes without errors
- [ ] `server/tsconfig.json` has `strict: true`
- [ ] All scripts defined in package.json
