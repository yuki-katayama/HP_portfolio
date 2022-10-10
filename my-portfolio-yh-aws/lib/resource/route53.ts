
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as targets from 'aws-cdk-lib/aws-route53-targets';

export class Route53 {
	publicHostedZone: cdk.aws_route53.PublicHostedZone;

	ConstructOrder() {};
	public createResources(scope: Construct, domainName: string) {
		/* route53 作成 */
		  this.publicHostedZone = new route53.PublicHostedZone(scope, 'PublicHostedZone', {
			zoneName: domainName,
		})
	}
	public registerArecord(scope: Construct, cloudfront: cdk.aws_cloudfront.Distribution, domainName: string) {
		const zone = route53.HostedZone.fromHostedZoneAttributes(scope, `HostedZone`, {
			zoneName: domainName,
			hostedZoneId: this.publicHostedZone.hostedZoneId,
		  });

		  // create a cname to the appsync domain. will map to something like xxxx.cloudfront.net
		  new route53.ARecord(scope, `Alias`, {
			zone,
			recordName: '',
			target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(cloudfront)),
		  });
	}
}