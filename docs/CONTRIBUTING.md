# Contributing / agent workflow

## Branch policy

- **`main` is protected.** Changes land only by **pull request** that a **human merges**.
- Do **not** commit or push directly to `main`.
- Do **not** merge pull requests unless the repository owner explicitly asks you to in that message.
- Use a feature branch, for example: `cursor/short-description-de41` (lowercase).

## Typical flow

1. Create/switch to a feature branch from the latest `main`.
2. Commit and push the feature branch to GitHub.
3. Open a PR into `main` (title + short summary).
4. Wait for **CI** (`Build static site`) to pass.
5. Stop. The owner reviews and merges; merge triggers deploy to https://ankyloshop.com.

## First-time GitHub setup

Owners must enable the branch ruleset once: **[BRANCH_PROTECTION.md](./BRANCH_PROTECTION.md)**.
