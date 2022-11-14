
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class Lambda {
	lambda: cdk.aws_lambda.Function;

	ConstructOrder() {};
	public createResources(scope: Construct, lambdaName: string) {
		const fn = new lambda.Function(scope, lambdaName, {
			runtime: lambda.Runtime.NODEJS_16_X,
			handler: 'lambdaHandler',
			code: lambda.Code.fromAsset('./lib/resources/lambda'),
		});
	}
}