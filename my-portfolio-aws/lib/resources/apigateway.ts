
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as stepfunctions from 'aws-cdk-lib/aws-stepfunctions';

export class Apigateway {
	apigateway: cdk.aws_apigateway.RestApi;

	ConstructOrder() {};
	public createResources(scope: Construct, apigatewayName: string) {
		/* apigatewayの作成 */
		this.apigateway = new apigateway.RestApi(scope, apigatewayName, {
			defaultCorsPreflightOptions: {
				allowOrigins: apigateway.Cors.ALL_ORIGINS,
				allowMethods: apigateway.Cors.ALL_METHODS // this is also the default
			}
		});

	}
	public createEndpointSes(lambda: cdk.aws_lambda.Function, adminEmail: string) {
		/* apiのエンドポイントを作成 */
		const post = this.apigateway.root.addResource('ses');
		const getBookIntegration = new apigateway.LambdaIntegration(lambda,{
			requestTemplates: {
				/* lambdaのeventに渡す形式を指定 */
				'application/json': JSON.stringify({
					adminEmail: adminEmail,
					name: "$util.escapeJavaScript($input.params('name'))",
					email: "$util.escapeJavaScript($input.params('email'))",
					content: "$util.escapeJavaScript($input.params('content'))",
				})
			},  // This parameter defines the behavior of the engine is no suitable response template is found
			passthroughBehavior: apigateway.PassthroughBehavior.NEVER,
			proxy: false,
			integrationResponses: [
			  {
				statusCode: "200",
			  },
			]
		});
		/* apiのメソッドを作成 */
		post.addMethod("POST", getBookIntegration,
		{
			// we can set request validator options like below
			requestValidatorOptions: {
				requestValidatorName: 'test-validator',
				validateRequestBody: true,
				validateRequestParameters: false
			},
			methodResponses: [{
				statusCode: '200',
			}],
		  }
		);
	}
}