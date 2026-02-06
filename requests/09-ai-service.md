# Task 09: AI Service (Claude Integration)

## Objective
Build Claude Haiku integration for hero-position matching and personality summaries.

## Prerequisites
- Task 04 completed (Anthropic client singleton)

## Functions
1. `matchHeroesToPosition(position, candidates[])` — Returns scored matches with corporate reasoning
2. `matchPositionsToHero(hero, positions[])` — Returns scored position matches
3. `generatePersonalitySummary(hero)` — Returns comedic corporate personality blurb

## Validation
- [ ] File compiles without errors
- [ ] API errors throw ServiceUnavailableError
