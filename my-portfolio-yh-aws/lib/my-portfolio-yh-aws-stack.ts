import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { Acm } from './resource/acm';
import { Route53 } from './resource/route53';
import { S3 } from './resource/s3';
import { CloudFront } from './resource/cloudfront';
import { Apigateway } from './resource/apigateway';

export class MyPortfolioYhAwsStack extends cdk.Stack {

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const domainName = "tekitou.ga";
    const backetName = "my-port-folio-yh-tekitou-cdk";
    const deployPathToBacket = "./../deploy/";
    const apigatewayName = "sendMailTest"

    const route53 = new Route53();
    const s3 = new S3();
    const acm = new Acm();
    const cloudfront = new CloudFront();
    const apigateway = new Apigateway();

    /* s3の作成 */
    s3.createResources(this, backetName);
    /* cloudFrontのOAIを作成 */
    cloudfront.createOAI(this);
    /* cloudFrontからのアクセスをs3側で許可する */
    s3.enableAccessFromCloudFront(cloudfront.oai);
    /* s3へソースをデプロイ */
    s3.deploy(this, deployPathToBacket);
    /* route53 作成 */
    route53.createResources(this, domainName);
    /* 証明書発行 */
    acm.createResources(this, route53.publicHostedZone, domainName);
    /* cloudFrontの作成 */
    cloudfront.createResources(this, domainName, s3.s3Bucket, acm.certificatemanager);
    /* route53をcloudFrontへ繋ぐ */
    route53.registerArecord(this, cloudfront.distribution, domainName);
    apigateway.createResources(this, apigatewayName);
  }
}