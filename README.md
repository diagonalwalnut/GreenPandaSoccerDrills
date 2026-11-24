# Dual-Foot Soccer Lab

A 6-week backyard soccer training app for a competitive 11-year-old who needs stronger **ball control**, **footwork**, and **shooting power** — with equal work for the **right and left** foot in every drill.

**Live site:** [https://ankyloshop.com](https://ankyloshop.com) (also [https://www.ankyloshop.com](https://www.ankyloshop.com))

## What’s inside

- **18 home sessions** (6 weeks × Sessions A / B / C), ~30 minutes each
- Drill cards with setup diagrams, gear lists, both-feet protocols, coaching cues, and progressions
- Built-in **session timer** that steps through warm-up → primary → secondary → finisher
- Filterable **drill library** by focus (Control / Footwork / Power) and equipment

### Gear assumed

Multiple balls, cones + flat disks, 6 agility poles, agility ladder, two 12′×6′ goals, and one player mannequin. Sessions are backyard-first with optional field-stretch notes.

### Schedule

Aim for **3 sessions per week**. If you only have two days, do **A then B** and skip C that week (don’t skip A).

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3847](http://localhost:3847).

```bash
npm run build   # static export → out/
```

## Stack

Next.js (App Router) static export, TypeScript, Tailwind CSS, shadcn/ui.

## AWS deployment (serverless)

Low-cost enterprise pattern: **private S3** origin + **CloudFront** on **ankyloshop.com** (HTTPS via ACM, OAC, security headers, URL rewrite) provisioned with **AWS CDK** (TypeScript).

```text
Users → https://ankyloshop.com (and www)
          → CloudFront (TLS 1.2+, compress, cache)
          → Origin Access Control
          → Private S3 bucket (SSE-S3, Block Public Access)
DNS: Route 53 hosted zone for ankyloshop.com → alias to CloudFront
```

**Expected cost** at light family traffic: about **$1–5/month** for S3/CloudFront, plus ~**$0.50/month** for the Route 53 hosted zone (no ALB, no Fargate, no SSR compute). ACM certificates are free.

### Prerequisites

1. A **Route 53 public hosted zone** for `ankyloshop.com` in the same AWS account (nameservers delegated from your registrar).
2. Deploy the stack in **`us-east-1`** (required for CloudFront ACM certificates).
3. AWS credentials with rights to ACM, CloudFront, S3, Route 53, and IAM.

### 1. Deploy infrastructure

```bash
cd infra
npm install
npx cdk bootstrap aws://ACCOUNT_ID/us-east-1   # once per account/region
npx cdk deploy
```

Defaults in [`infra/cdk.json`](infra/cdk.json) already set `githubOwner`, `githubRepo`, and `siteDomain` (`ankyloshop.com`).

CDK will:

- Look up the `ankyloshop.com` hosted zone
- Issue an ACM cert for `ankyloshop.com` + `www.ankyloshop.com` (DNS validation)
- Attach the cert to CloudFront
- Create apex and `www` A/AAAA alias records to the distribution

Note the outputs: `SiteUrl` (`https://ankyloshop.com`), `BucketName`, `DistributionId`, and `GitHubDeployRoleArn`.

### 2. Upload the site (local)

Requires AWS CLI credentials with access to the stack:

```bash
./scripts/deploy-static.sh
```

When finished, open [https://ankyloshop.com](https://ankyloshop.com).

### 3. GitHub Actions (optional)

After CDK deploy, add repository secrets on [GreenPandaSoccerDrills](https://github.com/diagonalwalnut/GreenPandaSoccerDrills):

| Secret | Value |
|--------|--------|
| `AWS_DEPLOY_ROLE_ARN` | `GitHubDeployRoleArn` output |
| `AWS_S3_BUCKET` | `BucketName` output |
| `AWS_CLOUDFRONT_DISTRIBUTION_ID` | `DistributionId` output |

Pushes to `main` build `out/` and sync to S3 + invalidate CloudFront (OIDC, no long-lived keys). The public URL remains **https://ankyloshop.com**.
