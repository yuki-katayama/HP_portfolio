
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';

export class Acm {
	certificatemanager: cdk.aws_certificatemanager.DnsValidatedCertificate;

	ConstructOrder() {};
	public createResources(scope: Construct, zone: cdk.aws_route53.PublicHostedZone, domainName: string) {
		  // Certificate Manager設定
		  this.certificatemanager = new acm.DnsValidatedCertificate(scope, 'CertificateManagerCertificate', {
			// ドメイン指定
			domainName: domainName,
			// ホストゾーンID指定
			hostedZone: zone,
			// リージョン指定 (CloudFront固定)
			region: 'us-east-1',
			// 検証方法指定
			validation: acm.CertificateValidation.fromDns(),
		});
	}
}