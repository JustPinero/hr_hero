# Task 01: Project Scaffolding & Root Configuration

## Objective
Set up the root-level project configuration files for the HR Hero rebuild.

## Context
HR Hero is being rebuilt from scratch. The old project (React 16, Express, Sequelize, MySQL) exists at root level. We are creating a new `client/` and `server/` directory structure. Old files will be cleaned up later.

## Files to Create

### 1. `.gitignore` (rewrite existing)
Path: `/Users/justinpinero/Desktop/projects/hr_hero/.gitignore`

Must ignore:
- `node_modules/`
- `.env` (in all directories)
- `dist/`, `build/`
- `*.tsbuildinfo`
- `.prisma/`
- `coverage/`
- `.DS_Store`
- `server/prisma/migrations/` (optional — some teams commit these)

### 2. `.env.example`
Path: `/Users/justinpinero/Desktop/projects/hr_hero/.env.example`

### 3. `CLAUDE.md`
Path: `/Users/justinpinero/Desktop/projects/hr_hero/CLAUDE.md`

### 4. `README.md` (rewrite existing)
Path: `/Users/justinpinero/Desktop/projects/hr_hero/README.md`

## Validation
- [ ] `.gitignore` exists and covers all artifacts
- [ ] `.env.example` documents all required environment variables
- [ ] `CLAUDE.md` contains complete project rules
- [ ] `README.md` accurately describes the new stack
