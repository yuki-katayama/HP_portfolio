import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {load} from 'ts-dotenv'
import { S3 } from './resources/s3';
import { Apigateway } from './resources/apigateway';
import { Cloudfront } from './resources/cloudfront';
import { Route53 } from './resources/route53';
import { Acm } from './resources/acm';
import { Lambda } from './resources/lambda';
import { IamRole } from './resources/iam-role';
// import { Waf } from './resources/waf';

const env = load({
  BacketName: String,
  ApigatewayName: String,
  DeployPathToBacket: String,
  DomainName: String,
  LambdaForSesName: String,
  LambdaSesFileName: String,
  ConnectLambdaToSesRoleName: String,
  AdminEmail: String,
  AccountId: String,
  IsBasicCertification: Boolean,
  BasicCertificationFunctionName: String,
  BasicCertificationFunctionPath: String,
});

export class MyPortfolioAwsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    const s3 = new S3();
    const apigateway = new Apigateway();
    const cloudfront = new Cloudfront();
    const route53 = new Route53();
    const acm = new Acm();
    const lambda = new Lambda();
    const iamRole = new IamRole();
    // const waf = new Waf();

    super(scope, id, props);
      /* s3の作成 */
      s3.createResources(this, env.BacketName);
      /* cloudFrontのOAIを作成 */
      cloudfront.createOAI(this);
      /* cloudFrontからのアクセスをs3側で許可する */
      s3.enableAccessFromCloudFront(cloudfront.oai);
      /* s3へソースをデプロイ */
      s3.deploy(this, env.DeployPathToBacket);
      /* route53 作成 */
      route53.createResources(this, env.DomainName);
      /* 証明書発行 */
      acm.createResources(this, route53.publicHostedZone, env.DomainName);
      /* Basic認証の設定 */
      if (env.IsBasicCertification) {
        cloudfront.createFunction(this, env.BasicCertificationFunctionName, env.BasicCertificationFunctionPath);
      }
      /* cloudFrontの作成 */
      cloudfront.createResources(this, env.DomainName, s3.s3Bucket, acm.certificatemanager);
      /* route53をcloudFrontへ繋ぐ */
      route53.registerArecord(this, cloudfront.distribution, env.DomainName);
      /* SESと接続するlambdaに使用するIamRoleの作成 */
      iamRole.createConnectLambdaToSesRole(this, env.ConnectLambdaToSesRoleName)
      /* SESに関するlambdaの作成 */
      lambda.createResources(this, env.LambdaForSesName, env.LambdaSesFileName, iamRole.connectLambdaToSesRole);
      /* apigatewayの作成 */
      apigateway.createResources(this, env.ApigatewayName);
      /* apigatewayでSesのエンドポイント作成 */
      apigateway.createEndpointSes(lambda.lambdaForSes, env.AdminEmail);

      // waf.createResources(this);
  }
}
