# Deployment setup — ankyloshop.com

This guide sets up hosting and **automatic deploys when a pull request is merged into `main`**.

**You do not install anything on your personal computer.** All one-time setup uses:

- the **AWS Console** and **AWS CloudShell** (a browser terminal that runs *inside AWS*), and
- the **GitHub** website, and
- the **DNSimple** website (only to hand DNS control to AWS).

**Production URL:** https://ankyloshop.com (also https://www.ankyloshop.com)

```text
You (browser) → AWS CloudShell: create infra once
You (browser) → DNSimple: point nameservers at Route 53
You (browser) → GitHub: secrets + merge PRs
     ↓
PR merged into main → GitHub Actions builds & deploys
     ↓
https://ankyloshop.com updated
```

---

## What “local” means here

| Phrase | Meaning |
|--------|---------|
| **Not used** | Installing Node, AWS CLI, or CDK on your laptop |
| **AWS CloudShell** | Temporary Linux shell *in your AWS account* (browser). Commands run on AWS, not on your PC. |
| **GitHub Actions** | Builds and deploys on GitHub’s runners after each merge |

Day-to-day you only use GitHub (PRs) and a web browser to view https://ankyloshop.com.

---

## What you will create

| Piece | Purpose |
|-------|---------|
| Route 53 hosted zone | AWS becomes the **DNS authority** for `ankyloshop.com` |
| DNSimple NS change | Registrar still at DNSimple; DNS answers come from Route 53 |
| ACM certificate | Free HTTPS for apex + `www` |
| S3 + CloudFront | Static site hosting |
| IAM OIDC role | GitHub Actions deploys without AWS access keys on your PC |
| GitHub secrets + `production` env | Wire the deploy workflow |

---

## Step 1 — Open AWS in the browser (us-east-1)

1. Sign in to the [AWS Management Console](https://console.aws.amazon.com/).
2. In the top bar, set the region to **US East (N. Virginia) `us-east-1`**.  
   CloudFront custom-domain certificates must be issued in this region.
3. Confirm you can open services such as Route 53 and CloudFormation.

---

## Step 2 — Create a Route 53 hosted zone (AWS manages DNS)

This is the AWS side of “AWS will manage the host.” DNS records for the website live in Route 53 after this.

1. Open **Route 53 → Hosted zones → Create hosted zone**.
2. Set:
   - **Domain name:** `ankyloshop.com`
   - **Type:** Public hosted zone
3. Click **Create hosted zone**.
4. Open the new zone and find the **NS** record. Copy the **four** nameserver values (they look like `ns-xxxx.awsdns-xx.org`).

Leave this tab open — you need those NS values in DNSimple next.

> The CDK stack looks up this hosted zone by name in the same AWS account. Create it before Step 4.

---

## Step 3 — Connect DNSimple to AWS (delegate DNS)

Your domain can stay **registered** at DNSimple. You are only changing **who answers DNS queries** so that **AWS Route 53** manages `ankyloshop.com` (and `www`).

This connection was **not** automatic in earlier docs; follow these DNSimple steps:

1. Sign in to [DNSimple](https://dnsimple.com/).
2. Open **Domains** → select **ankyloshop.com**.
3. Open the **Name Servers** (or **DNS / Delegation**) settings for that domain.  
   DNSimple’s UI labels this as managing name servers / delegating to another provider.
4. Switch from DNSimple’s own name servers to **custom / external name servers**.
5. Paste the **four Route 53 NS hostnames** from Step 2 (one per field). Do not invent NS names; use exactly what Route 53 shows.
6. Save.

**What this does**

- DNSimple remains the registrar (billing/renewal for the domain name).
- After delegation propagates, the internet asks **Route 53** for `ankyloshop.com` records.
- CDK will create the apex and `www` **A/AAAA** aliases to CloudFront in Route 53.
- You do **not** need to create A/AAAA records for the site inside DNSimple once NS are pointed at Route 53 (DNSimple DNS records are no longer used for public resolution).

**Check propagation** (from any browser DNS tool, or CloudShell later):

```bash
dig NS ankyloshop.com +short
```

You should see the AWS `awsdns` nameservers. This can take minutes to 48 hours.

---

## Step 4 — Bootstrap and deploy infra in AWS CloudShell (not your PC)

CloudShell is a browser terminal **inside AWS**. Nothing is installed on your computer.

1. In the AWS Console top bar, click the **CloudShell** icon (terminal). Wait until the shell is ready. Prefer region **us-east-1**.
2. Clone the repo and install infra dependencies (downloads happen in CloudShell’s home directory on AWS):

   ```bash
   git clone https://github.com/diagonalwalnut/GreenPandaSoccerDrills.git
   cd GreenPandaSoccerDrills/infra
   npm install
   ```

3. Bootstrap CDK once for this account/region:

   ```bash
   ACCOUNT_ID="$(aws sts get-caller-identity --query Account --output text)"
   npx cdk bootstrap "aws://${ACCOUNT_ID}/us-east-1"
   ```

4. Deploy the stack (creates S3, CloudFront, ACM, Route 53 aliases, GitHub OIDC deploy role):

   ```bash
   npx cdk deploy --require-approval never
   ```

   [`infra/cdk.json`](../infra/cdk.json) already sets `githubOwner`, `githubRepo`, and `siteDomain` (`ankyloshop.com`).

5. When deploy finishes, **copy the Outputs** printed at the end (or open **CloudFormation → Stacks → DualFootSoccerLabStack → Outputs**):

| Output | Used for |
|--------|----------|
| `SiteUrl` | Should be `https://ankyloshop.com` |
| `BucketName` | GitHub secret `AWS_S3_BUCKET` |
| `DistributionId` | GitHub secret `AWS_CLOUDFRONT_DISTRIBUTION_ID` |
| `GitHubDeployRoleArn` | GitHub secret `AWS_DEPLOY_ROLE_ARN` |

Re-print outputs anytime in CloudShell:

```bash
aws cloudformation describe-stacks \
  --stack-name DualFootSoccerLabStack \
  --region us-east-1 \
  --query 'Stacks[0].Outputs'
```

**What the stack creates**

1. Private S3 bucket  
2. ACM cert for `ankyloshop.com` + `www.ankyloshop.com` (DNS validated via Route 53)  
3. CloudFront distribution (HTTPS, OAC, security headers)  
4. Route 53 A/AAAA for apex and `www` → CloudFront  
5. IAM role for GitHub Actions (OIDC, `main` branch only)

---

## Step 5 — Configure GitHub (browser only)

Merging a PR into `main` triggers [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml).

### 5.1 Create the `production` environment

1. Open https://github.com/diagonalwalnut/GreenPandaSoccerDrills/settings/environments  
2. **New environment** → name exactly `production` → save  
3. Optional: add required reviewers for production deploys  

### 5.2 Add repository secrets

1. Open https://github.com/diagonalwalnut/GreenPandaSoccerDrills/settings/secrets/actions  
2. Create each secret (names must match exactly):

| Secret name | Paste from CloudFormation output |
|-------------|----------------------------------|
| `AWS_DEPLOY_ROLE_ARN` | `GitHubDeployRoleArn` |
| `AWS_S3_BUCKET` | `BucketName` |
| `AWS_CLOUDFRONT_DISTRIBUTION_ID` | `DistributionId` |

Do **not** create long-lived AWS access keys on your computer or in GitHub. Actions use OIDC.

### 5.3 Confirm Actions are enabled

1. https://github.com/diagonalwalnut/GreenPandaSoccerDrills/settings/actions  
2. Allow Actions for this repo  
3. Actions tab should list **CI** and **Deploy to ankyloshop.com**

---

## Step 6 — First site publish (GitHub Actions, not your PC)

1. GitHub → **Actions** → **Deploy to ankyloshop.com** → **Run workflow** → branch `main` → **Run workflow**.  
2. Wait for a green run.  
3. Open https://ankyloshop.com (and https://www.ankyloshop.com).  

If DNS is still propagating (Step 3), HTTPS may fail until `dig NS ankyloshop.com` shows Route 53 nameservers and the ACM cert is **Issued** in ACM.

---

## Step 7 — Day-to-day: automatic deploy on merge

1. Open a pull request into `main` (via GitHub’s UI or github.dev — still no laptop tooling required).  
2. **CI** builds the PR ([`.github/workflows/ci.yml`](../.github/workflows/ci.yml)). Fix failures before merging.  
3. **Merge** the PR.  
4. **Deploy to ankyloshop.com** runs automatically.  
5. After it finishes, https://ankyloshop.com serves the new build (usually within a couple of minutes).

Open PRs never deploy to production. Only merges (or pushes) to `main` do.

---

## Step 8 — Verify end-to-end

1. Merge a small PR.  
2. Actions → open the deploy run for that merge → all steps green.  
3. Hard-refresh https://ankyloshop.com and confirm the change.

---

## Troubleshooting

| Symptom | What to check |
|---------|----------------|
| ACM cert stuck **Pending validation** | Step 3 — DNSimple NS not yet pointing at Route 53; wait for propagation |
| Site doesn’t resolve | DNSimple still on DNSimple NS; re-check the four `awsdns` nameservers |
| `cdk deploy` can’t find hosted zone | Step 2 — hosted zone `ankyloshop.com` in this account |
| Deploy workflow missing secrets | Step 5.2 — exact secret names |
| `AssumeRoleWithWebIdentity` denied | OIDC trust is `repo:diagonalwalnut/GreenPandaSoccerDrills:ref:refs/heads/main`; re-run `cdk deploy` in CloudShell if the role was wrong |
| 403/404 on the site | Run Step 6 (manual Actions deploy) once after infra is up |

---

## Cost reminder

Light family traffic: roughly **$1–5/month** CloudFront/S3 + **~$0.50/month** Route 53 hosted zone. ACM is free. DNSimple continues to charge whatever you pay them for **domain registration** only (not for DNS hosting once delegated).
