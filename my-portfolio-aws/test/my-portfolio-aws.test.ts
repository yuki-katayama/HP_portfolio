import * as cdk from 'aws-cdk-lib';
import * as MyPortfolioAws from '../lib/my-portfolio-aws-stack';
import { Template } from 'aws-cdk-lib/assertions';
import {load} from 'ts-dotenv'
// import * as MyPortfolioAws from '../lib/my-portfolio-aws-stack';

const env = load({
	BacketName: String,
	ApigatewayName: String,
	DeployPathToBacket: String,
	DomainName: String,
  });

const app = new cdk.App();
const stack = new MyPortfolioAws.MyPortfolioAwsStack(app, 'MyTestStack');
// THEN
const template = Template.fromStack(stack);

test('Snapshot Is Correct', () => {
	expect(template).toMatchSnapshot();
})

test('S3 Bucket Created', () => {
	template.hasResourceProperties(
		'AWS::S3::Bucket', {
			"BucketEncryption": {
			  "ServerSideEncryptionConfiguration": [
				{
				  "ServerSideEncryptionByDefault": {
					"SSEAlgorithm": "AES256"
				  }
				}
			  ]
			},
			"PublicAccessBlockConfiguration": {
				"BlockPublicAcls": true,
				"IgnorePublicAcls": true,
			},
			"BucketName": env.BacketName,
			"WebsiteConfiguration": {
				"IndexDocument": "index.html",
			}
		})
	}
)

test('Route53 Bucket Created', () => {
	template.hasResourceProperties(
		"AWS::Route53::RecordSet", {
			"Name": env.DomainName + '.',
			"Type": "A",
		}
	)
})

test('Apigateway Created', () => {
	template.hasResourceProperties(
		'AWS::ApiGateway::RestApi', {
			"Name": env.ApigatewayName,
		}
	)
})