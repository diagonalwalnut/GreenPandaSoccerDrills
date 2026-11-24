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

Low-cost pattern: **private S3** + **CloudFront** on **ankyloshop.com**, managed with **AWS CDK**.

```text
PR opened        → CI builds (no deploy)
PR merged → main → GitHub Actions deploys to https://ankyloshop.com
```

**Full setup (every step):** see **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)**.

Summary of that guide:

1. Install Node, AWS CLI; configure credentials in `us-east-1`
2. Create a Route 53 public hosted zone for `ankyloshop.com` and point the registrar NS records at it
3. `cd infra && npm install && npx cdk bootstrap && npx cdk deploy`
4. (Recommended) `./scripts/deploy-static.sh` once to seed content
5. In GitHub: create Environment `production` and secrets `AWS_DEPLOY_ROLE_ARN`, `AWS_S3_BUCKET`, `AWS_CLOUDFRONT_DISTRIBUTION_ID`
6. Merge a PR into `main` — deploy runs automatically

**Expected cost** at light traffic: about **$1–5/month** (S3/CloudFront) + **~$0.50/month** (Route 53). ACM is free.
