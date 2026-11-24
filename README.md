# Dual-Foot Soccer Lab

A 6-week backyard soccer training app for a competitive 11-year-old who needs stronger **ball control**, **footwork**, and **shooting power** — with equal work for the **right and left** foot in every drill.

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

Low-cost enterprise pattern: **private S3** origin + **CloudFront** (HTTPS, OAC, security headers, URL rewrite) provisioned with **AWS CDK** (TypeScript).

```text
Users → CloudFront (TLS 1.2+, compress, cache)
          → Origin Access Control
          → Private S3 bucket (SSE-S3, Block Public Access)
```

**Expected cost** at light family traffic: about **$1–5/month** (no ALB, no Fargate, no SSR compute).

### 1. Deploy infrastructure

```bash
cd infra
npm install
npx cdk bootstrap aws://ACCOUNT_ID/us-east-1   # once per account/region
npx cdk deploy \
  -c githubOwner=diagonalwalnut \
  -c githubRepo=GreenPandaSoccerDrills
```

Note the outputs: `SiteUrl`, `BucketName`, `DistributionId`, and (if context was set) `GitHubDeployRoleArn`.

### 2. Upload the site (local)

Requires AWS CLI credentials with access to the stack:

```bash
./scripts/deploy-static.sh
```

### 3. GitHub Actions (optional)

After CDK deploy, add repository secrets:

| Secret | Value |
|--------|--------|
| `AWS_DEPLOY_ROLE_ARN` | `GitHubDeployRoleArn` output |
| `AWS_S3_BUCKET` | `BucketName` output |
| `AWS_CLOUDFRONT_DISTRIBUTION_ID` | `DistributionId` output |

Pushes to `main` build `out/` and sync to S3 + invalidate CloudFront (OIDC, no long-lived keys).
