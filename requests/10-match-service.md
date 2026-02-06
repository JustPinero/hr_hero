# Task 10: Match Service (Cache Orchestration)

## Objective
Build match service that orchestrates cache checking, hero pre-filtering, AI calls, and result storage.

## Prerequisites
- Task 09 completed (AI service)
- Task 07 completed (hero service)

## Functions
1. `getPositionMatches(positionId)` — Check cache, pre-filter heroes, call AI, store results
2. `getHeroRoles(heroId)` — Check cache, load positions, call AI, store results
3. `generateHeroSummary(heroId)` — Generate and cache personality summary

## Validation
- [ ] First call triggers AI, second returns from cache
- [ ] Pre-filter returns relevant candidates per department
