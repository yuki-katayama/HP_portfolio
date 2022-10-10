
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';

export class CloudFront {
	oai: cdk.aws_cloudfront.OriginAccessIdentity;
	distribution: cdk.aws_cloudfront.Distribution;

	ConstructOrder() {};

	public createOAI(scope: Construct) {
		this.oai = new cloudfront.OriginAccessIdentity(scope, 'MyOriginAccessIdentity', /* all optional props */ {
			comment: 'Unique Domain Hosting Environment',
		});
	};
	public createResources(scope: Construct, domainName: string, bucket: cdk.aws_s3.Bucket, certificate: cdk.aws_certificatemanager.DnsValidatedCertificate) {
		/* cloudfront 作成 */
		this.distribution = new cloudfront.Distribution(scope, 'myDist', {
			/* s3バケットにつなげる */
			defaultBehavior: {
			origin: new origins.S3Origin(bucket, {
				originAccessIdentity: this.oai
			}),
			// HTTPメソッド指定
			allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD,
			cachedMethods: cloudfront.CachedMethods.CACHE_GET_HEAD,
			// ビューアプロトコルポリシー指定
			viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
			// キャッシュポリシー指定 (CachingOptimized)
			cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
			},
			/* 料金クラスを全てのエッジロケーション */
			priceClass: cloudfront.PriceClass.PRICE_CLASS_ALL,
			certificate: certificate,
			// セキュリティポリシー指定
			minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
			// HTTPバージョン指定
			httpVersion: cloudfront.HttpVersion.HTTP2_AND_3,
			/* 代替ドメイン */
			domainNames: [domainName],
			// ルートURL指定
			defaultRootObject: 'index.html',
			// IPv6有無指定
			enableIpv6: true,
		})
	}
}