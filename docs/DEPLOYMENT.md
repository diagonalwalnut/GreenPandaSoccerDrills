# Deployment setup — ankyloshop.com

This guide walks through **every step** to host Dual-Foot Soccer Lab on AWS and turn on **automatic deploys when a pull request is merged into `main`**.

**Production URL:** https://ankyloshop.com (also https://www.ankyloshop.com)

```text
Developer opens PR → CI builds (no deploy)
     ↓
PR merged into main → GitHub Actions “Deploy to ankyloshop.com”
     ↓
npm run build → S3 sync → CloudFront invalidation
     ↓
https://ankyloshop.com updated
```

---

## What you will create

| Piece | Purpose |
|-------|---------|
| Route 53 hosted zone | DNS for `ankyloshop.com` |
| ACM certificate | Free HTTPS for apex + `www` |
| S3 bucket (private) | Stores the static Next.js export |
| CloudFront distribution | Global CDN + HTTPS front door |
| IAM OIDC role | Lets GitHub Actions deploy without access keys |
| GitHub Actions secrets | Wire the workflow to your AWS stack |
| GitHub Environment `production` | Optional protection on the deploy job |

---

## Step 1 — Install tools locally

1. Install **Node.js 22+** and **npm**.
2. Install the **AWS CLI v2** and confirm it works:

   ```bash
   aws --version
   ```

3. Install the CDK CLI (used via `npx` in this repo, so a global install is optional):

   ```bash
   npm install -g aws-cdk
   ```

4. Clone the app:

   ```bash
   git clone https://github.com/diagonalwalnut/GreenPandaSoccerDrills.git
   cd GreenPandaSoccerDrills
   ```

---

## Step 2 — Configure AWS credentials

1. Create or use an IAM user / SSO identity with permission to manage S3, CloudFront, ACM, Route 53, IAM, and CloudFormation (AdministratorAccess is simplest for a personal account).
2. Configure the CLI for account **us-east-1** (required for CloudFront certificates):

   ```bash
   aws configure
   # AWS Access Key ID / Secret, region: us-east-1, output: json
   ```

3. Confirm identity and region:

   ```bash
   aws sts get-caller-identity
   echo "$AWS_REGION"   # should be us-east-1, or export AWS_REGION=us-east-1
   export AWS_REGION=us-east-1
   export AWS_DEFAULT_REGION=us-east-1
   ```

4. Note your **12-digit account ID** from `get-caller-identity` — you need it for bootstrap.

---

## Step 3 — Create the Route 53 hosted zone for ankyloshop.com

1. In the AWS Console, open **Route 53 → Hosted zones → Create hosted zone**.
2. Set:
   - **Domain name:** `ankyloshop.com`
   - **Type:** Public hosted zone
3. Create the zone and copy the **NS** records (four nameservers).
4. At your **domain registrar** (where you bought ankyloshop.com), set the domain’s nameservers to those four NS values.
5. Wait until DNS delegation works (often minutes, sometimes up to 48 hours):

   ```bash
   dig NS ankyloshop.com +short
   ```

   You should see the Route 53 nameservers.

> The CDK stack **looks up** this hosted zone by name. Deploy will fail if the zone is missing from the same AWS account.

---

## Step 4 — Bootstrap CDK (one time per account/region)

```bash
cd infra
npm install

ACCOUNT_ID="$(aws sts get-caller-identity --query Account --output text)"
npx cdk bootstrap "aws://${ACCOUNT_ID}/us-east-1"
```

This creates the CDK staging bucket and roles CloudFormation needs. Run it once; safe to re-run.

---

## Step 5 — Deploy the infrastructure stack

Still in `infra/`:

```bash
npx cdk deploy
```

[`cdk.json`](../infra/cdk.json) already sets:

- `githubOwner` = `diagonalwalnut`
- `githubRepo` = `GreenPandaSoccerDrills`
- `siteDomain` = `ankyloshop.com`

Approve the IAM changes when prompted.

**What this creates:**

1. Private S3 bucket (Block Public Access, SSE-S3)
2. ACM certificate for `ankyloshop.com` + `www.ankyloshop.com` (DNS validated in Route 53)
3. CloudFront distribution with OAC, TLS 1.2+, security headers, URL rewrite
4. Route 53 **A/AAAA** aliases for apex and `www` → CloudFront
5. IAM role + GitHub OIDC provider for Actions deploys (trust limited to this repo’s `main` branch)

**Save these stack outputs** (printed at the end of `cdk deploy`):

| Output | Used for |
|--------|----------|
| `SiteUrl` | Should be `https://ankyloshop.com` |
| `BucketName` | GitHub secret `AWS_S3_BUCKET` |
| `DistributionId` | GitHub secret `AWS_CLOUDFRONT_DISTRIBUTION_ID` |
| `GitHubDeployRoleArn` | GitHub secret `AWS_DEPLOY_ROLE_ARN` |
| `DistributionDomainName` | Debug / CloudFront console |

You can re-print outputs anytime:

```bash
aws cloudformation describe-stacks \
  --stack-name DualFootSoccerLabStack \
  --region us-east-1 \
  --query 'Stacks[0].Outputs'
```

---

## Step 6 — Upload the first site build (recommended once)

Before relying on CI, prove the stack serves content:

```bash
cd ..   # repo root
./scripts/deploy-static.sh
```

Then open https://ankyloshop.com and confirm the app loads (HTTPS, both feet drills, week links).

---

## Step 7 — Configure GitHub for automatic deploy on PR merge

Merging a PR into `main` creates a **push** to `main`. That runs [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml), which builds the static site, syncs S3, and invalidates CloudFront.

### 7.1 Create the `production` environment

1. Open https://github.com/diagonalwalnut/GreenPandaSoccerDrills/settings/environments
2. Click **New environment**
3. Name it exactly: `production`
4. (Optional) Add required reviewers if you want a human gate before production deploys
5. Save

The deploy workflow references `environment: production`.

### 7.2 Add repository secrets

1. Open https://github.com/diagonalwalnut/GreenPandaSoccerDrills/settings/secrets/actions
2. Click **New repository secret** for each row below (name must match exactly):

| Secret name | Value source |
|-------------|--------------|
| `AWS_DEPLOY_ROLE_ARN` | CloudFormation output `GitHubDeployRoleArn` |
| `AWS_S3_BUCKET` | CloudFormation output `BucketName` |
| `AWS_CLOUDFRONT_DISTRIBUTION_ID` | CloudFormation output `DistributionId` |

3. Confirm all three appear under **Repository secrets**.

> Do **not** create long-lived AWS access keys for Actions. The workflow assumes the IAM role via **OIDC**.

### 7.3 Confirm Actions are enabled

1. Open https://github.com/diagonalwalnut/GreenPandaSoccerDrills/settings/actions
2. Ensure Actions are allowed for this repository (e.g. **Allow all actions and reusable workflows**).
3. Open the **Actions** tab and verify workflows **CI** and **Deploy to ankyloshop.com** are listed.

### 7.4 Run a one-time manual deploy from GitHub (optional)

1. Actions → **Deploy to ankyloshop.com** → **Run workflow** → branch `main` → **Run workflow**
2. Confirm the job turns green and https://ankyloshop.com updates.

---

## Step 8 — Day-to-day: automatic deploy on merge

1. Create a branch and open a **pull request** into `main`.
2. The **CI** workflow ([`.github/workflows/ci.yml`](../.github/workflows/ci.yml)) builds the site on the PR. Fix failures before merging.
3. **Merge** the PR (merge commit, squash, or rebase — all result in a push to `main`).
4. GitHub starts **Deploy to ankyloshop.com** automatically.
5. When the job finishes, CloudFront invalidation completes and https://ankyloshop.com serves the new build (usually within a minute or two; rare edge cache lag up to a few minutes).

Direct pushes to `main` also deploy. Open PRs never deploy to production.

---

## Step 9 — Verify the pipeline end-to-end

1. Make a trivial README or copy change on a feature branch.
2. Open a PR → confirm **CI** passes.
3. Merge the PR.
4. On the Actions tab, open the deploy run for that merge commit.
5. Confirm steps: Checkout → Install → Build → Configure AWS → Sync/Invalidate all green.
6. Hard-refresh https://ankyloshop.com and confirm the change.

---

## Troubleshooting

| Symptom | What to check |
|---------|----------------|
| `cdk deploy` can’t find hosted zone | Step 3 — zone for `ankyloshop.com` in the same account; or pass `-c hostedZoneId=Z…` |
| ACM cert stuck pending | Route 53 NS not delegated yet; wait for dig NS to show AWS nameservers |
| Deploy workflow “Missing GitHub Actions secrets” | Step 7.2 — all three secret names exact |
| `Not authorized to perform sts:AssumeRoleWithWebIdentity` | Role trust must allow `repo:diagonalwalnut/GreenPandaSoccerDrills:ref:refs/heads/main`; re-deploy CDK if the role was created with wrong context |
| Site 403/404 after deploy | Run `./scripts/deploy-static.sh` once; confirm `out/` has `index.html` and week/session folders |
| Old content after green deploy | Wait for invalidation; hard-refresh or try an incognito window |

---

## Local commands cheat sheet

```bash
# App
npm ci && npm run build          # writes out/

# Infra
cd infra && npm ci && npx cdk diff && npx cdk deploy

# One-shot content publish
./scripts/deploy-static.sh
```

## Cost reminder

Light family traffic: roughly **$1–5/month** CloudFront/S3 + **~$0.50/month** Route 53 hosted zone. ACM is free. No ALB or always-on compute.
