import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as targets from 'aws-cdk-lib/aws-route53-targets';
import * as iam from 'aws-cdk-lib/aws-iam';

export class MyPortfolioYhAwsStack extends cdk.Stack {

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const domainName = "tekitou.ga";
    const backetName = "my-port-folio-yh-tekitou-cdk";

      /* route53 作成 */
      const createdRoute53 = new route53.PublicHostedZone(this, 'PublicHostedZone', {
        zoneName: domainName,
      })


      // Certificate Manager設定
      const certificateManagerCertificate = new acm.DnsValidatedCertificate(this, 'CertificateManagerCertificate', {
        // ドメイン指定
        domainName: domainName,
        // ホストゾーンID指定
        hostedZone: createdRoute53,
        // リージョン指定 (CloudFront固定)
        region: 'us-east-1',
        // 検証方法指定
        validation: acm.CertificateValidation.fromDns(),
    });

    const s3Bucket = new s3.Bucket(this, 's3-bucket', {
      /* default設定 */
      /* CDK スタックが削除された場合にバケットをどうするかを指定します。削除ポリシーをDESTROY(bucket gets deleted) に設定しました。デフォルトでは、バケットは孤立した状態で保持されます。*/
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      /* スタックが削除されたときにバケットの内容を自動的に空にします。これにより、バケットを削除できます。*/
      autoDeleteObjects: true,
      /* S3 バケットのバージョニングを有効にするかどうか*/
      versioned: false,
      /* 必要に応じて、保存されたオブジェクトのサーバー側暗号化のタイプを指定します*/
      encryption: s3.BucketEncryption.S3_MANAGED,

      /* バケットの名前はグローバルに一意である必要があるため、ハードコーディングすることはお勧めしません。 */
      bucketName: backetName,
      /* バケット内のすべてのオブジェクトをパブリックにアクセス可能にするかどうか*/
      publicReadAccess: true,
      // // ブロックパブリックアクセスをすべてON
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS,
      /* 他のドメインからの HTTP リクエストを許可します。たとえば、website.com から amazonaws.com にオブジェクトをバケットにアップロードするリクエストを行う場合*/
      websiteIndexDocument: "index.html"
    })

    const originAccessIdentity = new cloudfront.OriginAccessIdentity(this, 'MyOriginAccessIdentity', /* all optional props */ {
      comment: 'Unique Domain Hosting Environment',
    });
    // CloudFrontからGetObjectできるようにポリシーを追加
    const myBucketPolicy = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['s3:GetObject'],
      principals: [
          new iam.CanonicalUserPrincipal(
            originAccessIdentity.cloudFrontOriginAccessIdentityS3CanonicalUserId
          ),
      ],
      resources: [`${s3Bucket.bucketArn}/*`],
    });
    s3Bucket.addToResourcePolicy(myBucketPolicy);

    const deployment = new s3deploy.BucketDeployment(this, 'DeployWebsite', {
      sources: [s3deploy.Source.asset("./../deploy/")],
      destinationBucket: s3Bucket,
    });


    /* cloudfront 作成 */
    const createdCloudFront = new cloudfront.Distribution(this, 'myDist', {
      /* s3バケットにつなげる */
      defaultBehavior: {
        origin: new origins.S3Origin(s3Bucket, {
          originAccessIdentity: originAccessIdentity
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
      certificate: certificateManagerCertificate,
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

    const zone = route53.HostedZone.fromHostedZoneAttributes(this, `HostedZone`, {
      zoneName: domainName,
      hostedZoneId: createdRoute53.hostedZoneId,
    });

    // create a cname to the appsync domain. will map to something like xxxx.cloudfront.net
    new route53.ARecord(this, `Alias`, {
      zone,
      recordName: '',
      target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(createdCloudFront)),
    });
  }
}