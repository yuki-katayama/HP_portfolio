import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';

export class IamRole {
	connectLambdaToSesRole: cdk.aws_iam.Role;
	ConstructOrder(){}
	public createConnectLambdaToSesRole(scope: Construct, roleName: string) {
		this.connectLambdaToSesRole = new iam.Role(scope, roleName, {
			assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
			description: 'allow lambda connect to ses',
		});
		this.connectLambdaToSesRole.addManagedPolicy(
			iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonSESFullAccess")
		);
		this.connectLambdaToSesRole.addManagedPolicy(
			iam.ManagedPolicy.fromAwsManagedPolicyName("AWSLambdaExecute")
		);
	}
}