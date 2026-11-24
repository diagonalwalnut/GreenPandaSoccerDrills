# Require pull requests for `main`

Cursor (and anyone else) must **not** push straight to `main`. Production deploys only after a **human merges a pull request**.

This repo’s GitHub App / automation token **cannot** turn that on for you. Do it once in the GitHub website (about two minutes).

**Repo:** https://github.com/diagonalwalnut/GreenPandaSoccerDrills

---

## Step 1 — Open branch rules

1. Sign in to GitHub as a user who **owns** or **admins** `diagonalwalnut/GreenPandaSoccerDrills`.
2. Open **Settings** → **Rules** → **Rulesets**  
   Direct link: https://github.com/diagonalwalnut/GreenPandaSoccerDrills/settings/rules  
3. Click **New ruleset** → **New branch ruleset**.

---

## Step 2 — Configure the ruleset

| Field | Value |
|-------|--------|
| **Ruleset name** | `Protect main` |
| **Enforcement status** | **Active** |
| **Bypass list** | Leave **empty** (do not add Cursor, bots, or yourself as bypass — that recreates direct pushes) |

**Target branches**

1. Under **Target branches**, choose **Add target** → **Include by pattern**.
2. Enter: `main`

**Rules** (enable all of these)

1. **Restrict deletions** — on  
2. **Block force pushes** — on  
3. **Require a pull request before merging** — on  
   - **Required approvals:** `1` if you want a second person; use `0` if you are solo but still want every change to go through a PR you open and merge yourself.  
   - Turn on **Dismiss stale pull request approvals when new commits are pushed** if you use approvals.  
4. **Require status checks to pass** (recommended) — on  
   - Add check: `Build static site` (from the **CI** workflow)  
   - Enable **Require branches to be up to date before merging** if offered.

Click **Create** (or **Save changes**).

---

## Step 3 — Confirm direct pushes are blocked

1. (Optional) In CloudShell or any clone, try:  
   `git push origin main` with a dummy commit.  
   GitHub should **reject** the push citing the ruleset.
2. Open a small PR into `main` → wait for **CI** → **you** click **Merge**.
3. Confirm **Deploy to ankyloshop.com** runs only after that merge.

---

## How agents / Cursor must work after this

| Allowed | Not allowed |
|---------|-------------|
| Push a feature branch (e.g. `cursor/…`) | `git push` to `main` |
| Open a pull request | Merging the PR without you |
| Wait for you to review & merge | Adding themselves to the ruleset bypass list |

See also [DEPLOYMENT.md](./DEPLOYMENT.md) (deploy-on-merge) and [CONTRIBUTING.md](./CONTRIBUTING.md).

---

## Classic “Branch protection” (alternative UI)

If your account still shows **Settings → Branches → Add branch protection rule** instead of Rulesets:

1. Branch name pattern: `main`  
2. Enable **Require a pull request before merging**  
3. Enable **Do not allow bypassing the above settings** (or **Include administrators**)  
4. Disable force pushes and deletions  
5. Save  

Rulesets (Step 1–2) are preferred on current GitHub.
