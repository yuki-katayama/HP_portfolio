import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { S3 } from './resources/s3';
import { Apigateway } from './resources/apigateway';


export class MyPortfolioAwsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    const backetName = "my-port-folio-yh-tekitou-cdk";
    const ApigatewayName = "my-portfolio-test";

    const s3 = new S3();
    const apigateway = new Apigateway();

    super(scope, id, props);
      /* s3の作成 */
      s3.createResources(this, backetName);
      apigateway.createResources(this, ApigatewayName);
  }
}
