
// import * as cdk from 'aws-cdk-lib';
// import { Construct } from 'constructs';
// import * as waf from 'aws-cdk-lib/aws-waf';

// export class Waf {

// 	ConstructOrder() {};
// 	public createResources(scope: Construct) {
// 		const cfnWebACL = new waf.CfnWebACL(scope, 'MyCfnWebACL', {
// 			// defaultAction: {allow: {}},
// 			scope: "CLOUDFRONT",
// 			visibilityConfig: {
// 				cloudWatchMetricsEnabled: true,
// 				sampledRequestsEnabled: true,
// 				metricName: "wafV2WebAcl",
// 			},
// 			rules: [
// 				{
// 				  name: "AWSManagedRulesCommonRuleSet",
// 				  /** WebACLで複数のルールを定義する際に、各リクエストの優先度を設定する。
// 				   * 優先度は値が低いルールから処理する。
// 				   * 優先度は連続している必要はないが、すべて異なっていなければいけない。
// 				   * */
// 				  priority: 1,
// 				  statement: {
// 					managedRuleGroupStatement: {
// 					  vendorName: "AWS",
// 					  name: "AWSManagedRulesCommonRuleSet",
// 					},
// 				  },
// 				  overrideAction: { none: {} },
// 				  visibilityConfig: {
// 					cloudWatchMetricsEnabled: true,
// 					sampledRequestsEnabled: true,
// 					metricName: "AWSManagedRulesCommonRuleSet",
// 				  },
// 				},
// 			],
// 		})
// 	}
// }