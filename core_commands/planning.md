---
description: Research and create implementation plan for a feature
argument-hint: [feature-description]
---

# Planning: Feature Implementation Plan

## Feature Description

$ARGUMENTS

## Determine Feature Name

Create a concise kebab-case feature name. Plan saves to: `plans/[feature-name].md`

## Research Process

### 1. Analyze Existing Codebase

- Read `CLAUDE.md` for conventions
- Check `server/prisma/schema.prisma` for model impacts
- Review existing services in `server/src/services/`
- Review existing components in `client/src/components/`
- Check Tailwind theme in `client/tailwind.config.ts`
- Review AI prompts in `server/src/services/ai.service.ts` if AI-related

### 2. Design Implementation Approach

- Which files need creation or modification
- Schema changes (new models, fields, relations)
- New API endpoints needed
- New React components/pages needed
- New TanStack Query hooks needed

### 3. Break Down Into Tasks

Detailed tasks with file paths, exact function names, acceptance criteria.

## Required Plan Sections

1. Overview (brief description, requirements, success criteria)
2. Relevant Files (full paths, create vs modify)
3. Dependencies (new packages, config changes)
4. Step by Step Tasks (file, action, details, related files)
5. Testing Strategy
6. Validation Commands:
   ```bash
   cd server && npx tsc --noEmit
   cd server && npx prisma validate
   cd client && npx tsc --noEmit
   cd client && npm run build
   ```
7. Integration Notes

## Confirmation

- ✅ Plan saved to `plans/[feature-name].md`
- ✅ All tasks have file paths
- ✅ Another agent could execute without context
- **Next step**: Run `/execute plans/[feature-name].md`
