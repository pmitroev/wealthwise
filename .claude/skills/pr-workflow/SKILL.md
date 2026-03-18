---
name: pr-workflow
description: When making any code change, create a new branch, commit the changes, open a PR, and review it before merging.
---

# PR Workflow Skill

## When to use

Use this skill for every code change, no matter how small.

## Process

### 1. Create a branch

- Branch naming: `feature/short-description` for new features
- Branch naming: `fix/short-description` for bug fixes
- Branch naming: `refactor/short-description` for refactoring
- Always branch off `main`

```bash
git checkout main
git pull origin main
git checkout -b feature/your-description
```

### 2. Make the changes

- Apply only the requested changes
- Do not touch unrelated files
- Follow existing code conventions in the project

### 3. Commit

- Use conventional commits format
- `feat:` for new features
- `fix:` for bug fixes
- `refactor:` for refactoring
- `chore:` for config/tooling changes

```bash
git add .
git commit -m "feat: short description of change"
```

### 4. Push and open PR

```bash
git push origin feature/your-description
gh pr create --title "feat: short description" --body "## Changes\n- List what changed\n\n## Why\n- Explain the reason"
```

### 5. Review

Before considering the task done:

- List all files changed
- Summarize what changed and why
- Flag any potential issues or tradeoffs
- Suggest any improvements not in scope of this PR

## Rules

- Never push directly to main
- Always one PR per logical change
- PR body must explain what AND why
- Review must mention any TypeScript type changes
