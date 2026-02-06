# Task 03: Prisma Schema & Database Setup

## Objective
Define the complete database schema using Prisma and run the initial migration.

## Context
The database has three models: Hero, Position, HeroPositionMatch with enums for Availability, Department, ClearanceLevel, PositionStatus.

## Prerequisites
- Task 02 completed
- PostgreSQL running locally with database named `hr_hero`

## Key Design Decisions
- Hero `id` matches SuperHero API id (1-731) — NOT autoincrement
- `slug` is unique, computed from name during seeding
- Powerstats are individual Int columns for queryability
- `aliases` uses Postgres native arrays
- Height/weight parsed to integers (cm/kg)
- `HeroPositionMatch` has compound unique on `[heroId, positionId]`

## Validation
- [ ] `cd server && npx prisma validate` passes
- [ ] `cd server && npx prisma migrate dev --name init` creates migration successfully
