
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { KindOfLambda } from '../models'

export class Lambda {
	lambdaForSes: cdk.aws_lambda.Function;

	ConstructOrder() {};
	public createResources(scope: Construct, lambdaName: string, fileName: KindOfLambda, iamRole: cdk.aws_iam.Role) {
		const fn = new lambda.Function(scope, lambdaName, {
			runtime: lambda.Runtime.NODEJS_16_X,
			handler: fileName + '.lambdaHandler',
			code: lambda.Code.fromAsset("./lib/resources/lambda/"),
			role: iamRole
		});
		if (fileName === "send-ses") {
			this.lambdaForSes = fn;
		}
	}
}