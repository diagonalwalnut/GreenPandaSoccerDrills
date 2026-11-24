import * as cdk from "aws-cdk-lib";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as iam from "aws-cdk-lib/aws-iam";
import * as s3 from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import * as path from "path";

export class DualFootSiteStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const siteBucket = new s3.Bucket(this, "SiteBucket", {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      versioned: false,
      // Destroyable for low-cost personal use; empty before delete on stack destroy.
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    const urlRewrite = new cloudfront.Function(this, "UrlRewrite", {
      code: cloudfront.FunctionCode.fromFile({
        filePath: path.join(__dirname, "functions", "url-rewrite.js"),
      }),
      runtime: cloudfront.FunctionRuntime.JS_2_0,
      comment: "Append index.html for clean Next.js static-export paths",
    });

    const responseHeaders = new cloudfront.ResponseHeadersPolicy(
      this,
      "SecurityHeaders",
      {
        comment: "Baseline security headers for Dual-Foot Soccer Lab",
        securityHeadersBehavior: {
          contentTypeOptions: { override: true },
          frameOptions: {
            frameOption: cloudfront.HeadersFrameOption.DENY,
            override: true,
          },
          referrerPolicy: {
            referrerPolicy:
              cloudfront.HeadersReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN,
            override: true,
          },
          strictTransportSecurity: {
            accessControlMaxAge: cdk.Duration.seconds(31536000),
            includeSubdomains: true,
            preload: true,
            override: true,
          },
          xssProtection: {
            protection: true,
            modeBlock: true,
            override: true,
          },
        },
      },
    );

    const distribution = new cloudfront.Distribution(this, "Distribution", {
      comment: "Dual-Foot Soccer Lab",
      defaultRootObject: "index.html",
      minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
      httpVersion: cloudfront.HttpVersion.HTTP2_AND_3,
      priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(siteBucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        cachedMethods: cloudfront.CachedMethods.CACHE_GET_HEAD_OPTIONS,
        compress: true,
        responseHeadersPolicy: responseHeaders,
        functionAssociations: [
          {
            function: urlRewrite,
            eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
          },
        ],
      },
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 404,
          responsePagePath: "/404.html",
          ttl: cdk.Duration.minutes(5),
        },
        {
          httpStatus: 404,
          responseHttpStatus: 404,
          responsePagePath: "/404.html",
          ttl: cdk.Duration.minutes(5),
        },
      ],
    });

    // GitHub Actions OIDC deploy role (no long-lived access keys).
    // Set context -c githubOwner=ORG -c githubRepo=REPO when synthesizing for a real repo.
    const githubOwner = this.node.tryGetContext("githubOwner") as
      | string
      | undefined;
    const githubRepo = this.node.tryGetContext("githubRepo") as
      | string
      | undefined;

    if (githubOwner && githubRepo) {
      const oidcProvider = new iam.OpenIdConnectProvider(
        this,
        "GitHubOidcProvider",
        {
          url: "https://token.actions.githubusercontent.com",
          clientIds: ["sts.amazonaws.com"],
        },
      );

      const deployRole = new iam.Role(this, "GitHubDeployRole", {
        assumedBy: new iam.FederatedPrincipal(
          oidcProvider.openIdConnectProviderArn,
          {
            StringEquals: {
              "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
            },
            StringLike: {
              "token.actions.githubusercontent.com:sub": `repo:${githubOwner}/${githubRepo}:*`,
            },
          },
          "sts:AssumeRoleWithWebIdentity",
        ),
        description: "GitHub Actions role to sync static site and invalidate CDN",
        maxSessionDuration: cdk.Duration.hours(1),
      });

      siteBucket.grantReadWrite(deployRole);
      deployRole.addToPolicy(
        new iam.PolicyStatement({
          actions: [
            "cloudfront:CreateInvalidation",
            "cloudfront:GetInvalidation",
            "cloudfront:ListInvalidations",
          ],
          resources: [
            `arn:aws:cloudfront::${this.account}:distribution/${distribution.distributionId}`,
          ],
        }),
      );

      new cdk.CfnOutput(this, "GitHubDeployRoleArn", {
        value: deployRole.roleArn,
        description: "IAM role ARN for GitHub Actions OIDC deploy",
      });
    }

    new cdk.CfnOutput(this, "BucketName", {
      value: siteBucket.bucketName,
      description: "S3 bucket for static site objects",
    });

    new cdk.CfnOutput(this, "DistributionId", {
      value: distribution.distributionId,
      description: "CloudFront distribution ID",
    });

    new cdk.CfnOutput(this, "DistributionDomainName", {
      value: distribution.distributionDomainName,
      description: "CloudFront HTTPS domain (https://<value>)",
    });

    new cdk.CfnOutput(this, "SiteUrl", {
      value: `https://${distribution.distributionDomainName}`,
      description: "Public site URL",
    });
  }
}
