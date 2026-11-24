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

## Preview the app (optional)

If you only want to click around before AWS is live, open the repo in [github.dev](https://github.dev/diagonalwalnut/GreenPandaSoccerDrills) or use a cloud IDE. **Production setup does not require installing Node or the AWS CLI on your computer** — see the deployment guide.

## Stack

Next.js (App Router) static export, TypeScript, Tailwind CSS, shadcn/ui.

## AWS deployment (serverless)

**private S3** + **CloudFront** on **ankyloshop.com**, with DNS managed by **Route 53**. The domain can stay **registered at DNSimple**; you point DNSimple’s nameservers at Route 53 so AWS answers DNS.

```text
PR opened        → CI builds (no deploy)
PR merged → main → GitHub Actions deploys to https://ankyloshop.com
```

**Full setup (browser-only: AWS Console, CloudShell, DNSimple, GitHub):**  
**[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)**

Summary:

1. AWS Console (`us-east-1`) → create Route 53 hosted zone for `ankyloshop.com`
2. DNSimple → set custom nameservers to the four Route 53 NS values (AWS manages DNS afterward)
3. AWS CloudShell → `cdk bootstrap` + `cdk deploy` (runs on AWS, not your PC)
4. GitHub → Environment `production` + secrets from stack outputs
5. Actions → run **Deploy to ankyloshop.com** once, then merge PRs for automatic deploys

**Expected cost** at light traffic: about **$1–5/month** (S3/CloudFront) + **~$0.50/month** (Route 53). ACM is free. DNSimple only bills domain registration after DNS is delegated.
