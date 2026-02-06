---
description: Create git commit with conventional message format
argument-hint: [file1] [file2] ... (optional - commits all changes if not specified)
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git add:*), Bash(git commit:*)
---

# Commit: Create Git Commit

## Files to Commit

Files specified: $ARGUMENTS

## Commit Process

### 1. Review Current State

!`git status`
!`git diff HEAD`

### 2. Analyze Changes

**Type:** feat | fix | refactor | docs | test | chore | perf | style

**Scope (HR Hero specific):**
- `(server)` — backend changes
- `(client)` — frontend changes
- `(prisma)` — schema/migration changes
- `(ai)` — AI service/prompt changes
- `(ui)` — component/styling changes
- `(api)` — API endpoint changes

**Description:** 50 chars or less, imperative mood

### 3. Stage Files

⚠️ NEVER commit `.env` files or files containing API keys.

### 4. Create Commit

```
type(scope): description

[optional body]

Co-authored-by: Claude <noreply@anthropic.com>
```

### 5. Confirm Success

!`git log -1 --oneline`
!`git show --stat`
