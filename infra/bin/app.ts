#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { DualFootSiteStack } from "../lib/dual-foot-site-stack";

const app = new cdk.App();

new DualFootSiteStack(app, "DualFootSoccerLabStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION ?? "us-east-1",
  },
  description:
    "Dual-Foot Soccer Lab on ankyloshop.com: private S3 + CloudFront (OAC) + ACM",
});
