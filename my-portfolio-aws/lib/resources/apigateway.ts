
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

export class Apigateway {
	apigateway: cdk.aws_apigateway.RestApi;

	ConstructOrder() {};
	public createResources(scope: Construct, apigatewayName: string) {
		this.apigateway = new apigateway.RestApi(scope, apigatewayName, {
			defaultCorsPreflightOptions: {
				allowOrigins: apigateway.Cors.ALL_ORIGINS,
				allowMethods: apigateway.Cors.ALL_METHODS // this is also the default
			}
		}
		);
		this.apigateway.root.addMethod(
		  "POST",
		);
	}
}