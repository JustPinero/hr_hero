# Task 11: Match & Summary Controller + Routes

## Objective
Wire up match and summary endpoints to the match service.

## Prerequisites
- Task 10 completed

## Endpoints
- `GET /api/positions/:id/matches` — Position matches
- `GET /api/heroes/:id/roles` — Hero roles
- `POST /api/heroes/:id/generate-summary` — Personality summary

## Validation
- [ ] `GET /api/positions/1/matches` returns AI-generated hero matches
- [ ] `GET /api/heroes/70/roles` returns matched positions for Batman
- [ ] `POST /api/heroes/70/generate-summary` returns a personality blurb
