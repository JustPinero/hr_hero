# Task 16: TanStack Query Hooks

## Objective
Create all data-fetching hooks using TanStack Query.

## Prerequisites
- Task 13 completed

## Files to Create
1. `client/src/hooks/useHeroes.ts` — Infinite query for hero list
2. `client/src/hooks/useHero.ts` — Single hero detail
3. `client/src/hooks/usePositions.ts` — All positions
4. `client/src/hooks/usePosition.ts` — Single position
5. `client/src/hooks/usePositionMatches.ts` — Position matches (staleTime: Infinity)
6. `client/src/hooks/useHeroRoles.ts` — Hero roles (staleTime: Infinity)
7. `client/src/hooks/useIntersectionObserver.ts` — Infinite scroll helper

## Validation
- [ ] All hooks compile without errors
- [ ] useHeroes returns paginated data with fetchNextPage
