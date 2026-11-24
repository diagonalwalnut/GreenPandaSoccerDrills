#!/usr/bin/env bash
# Build the static site and sync it to the CloudFront-backed S3 bucket.
# Prerequisites: AWS CLI configured, CDK stack already deployed.
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

STACK_NAME="${STACK_NAME:-DualFootSoccerLabStack}"
REGION="${AWS_REGION:-${AWS_DEFAULT_REGION:-us-east-1}}"

echo "==> Building static export"
npm ci
npm run build

if [[ ! -d out ]]; then
  echo "error: out/ missing after build" >&2
  exit 1
fi

echo "==> Reading stack outputs from ${STACK_NAME} (${REGION})"
BUCKET_NAME="$(aws cloudformation describe-stacks \
  --stack-name "$STACK_NAME" \
  --region "$REGION" \
  --query "Stacks[0].Outputs[?OutputKey=='BucketName'].OutputValue" \
  --output text)"
DISTRIBUTION_ID="$(aws cloudformation describe-stacks \
  --stack-name "$STACK_NAME" \
  --region "$REGION" \
  --query "Stacks[0].Outputs[?OutputKey=='DistributionId'].OutputValue" \
  --output text)"
SITE_URL="$(aws cloudformation describe-stacks \
  --stack-name "$STACK_NAME" \
  --region "$REGION" \
  --query "Stacks[0].Outputs[?OutputKey=='SiteUrl'].OutputValue" \
  --output text)"

if [[ -z "$BUCKET_NAME" || "$BUCKET_NAME" == "None" ]]; then
  echo "error: BucketName output not found. Deploy the CDK stack first:" >&2
  echo "  cd infra && npx cdk deploy -c githubOwner=diagonalwalnut -c githubRepo=GreenPandaSoccerDrills" >&2
  exit 1
fi

echo "==> Syncing out/ → s3://${BUCKET_NAME}"
aws s3 sync out/ "s3://${BUCKET_NAME}/" --delete --region "$REGION"

echo "==> Invalidating CloudFront ${DISTRIBUTION_ID}"
aws cloudfront create-invalidation \
  --distribution-id "$DISTRIBUTION_ID" \
  --paths "/*" \
  --region "$REGION" >/dev/null

echo "==> Done. Site: ${SITE_URL}"
