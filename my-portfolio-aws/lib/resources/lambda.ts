
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class Lambda {
	lambda: cdk.aws_lambda.Function;

	ConstructOrder() {};
	public createLambdaForSes(scope: Construct, lambdaName: string, dirName: string, iamRole: cdk.aws_iam.Role) {
		const fn = new lambda.Function(scope, lambdaName, {
			runtime: lambda.Runtime.NODEJS_16_X,
			handler: 'index.lambdaHandler',
			code: lambda.Code.fromAsset('./lib/resources/lambda/' + dirName),
			role: iamRole
		});
	}
}