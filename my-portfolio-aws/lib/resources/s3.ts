
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as iam from 'aws-cdk-lib/aws-iam';

export class S3 {
	s3Bucket: cdk.aws_s3.Bucket;
	s3BucketDeployment: cdk.aws_s3_deployment.BucketDeployment;

	ConstructOrder() {};
	public createResources(scope: Construct, backetName: string) {
		this.s3Bucket = new s3.Bucket(scope, 's3-bucket', {
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
			/* ブロックパブリックアクセス (バケット設定). */
			// blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
			/* 他のドメインからの HTTP リクエストを許可します。たとえば、website.com から amazonaws.com にオブジェクトをバケットにアップロードするリクエストを行う場合*/
			websiteIndexDocument: "index.html",
		  })
	}

	public enableAccessFromCloudFront(oai: cdk.aws_cloudfront.OriginAccessIdentity) {
		  // CloudFrontからGetObjectできるようにポリシーを追加
		  const myBucketPolicy = new iam.PolicyStatement({
			effect: iam.Effect.ALLOW,
			actions: ['s3:GetObject'],
			principals: [
				new iam.CanonicalUserPrincipal(
				  oai.cloudFrontOriginAccessIdentityS3CanonicalUserId
				),
			],
			resources: [`${this.s3Bucket.bucketArn}/*`],
		  });
		  this.s3Bucket.addToResourcePolicy(myBucketPolicy);
	}

	public deploy(scope: Construct, path: string) {
		this.s3BucketDeployment = new s3deploy.BucketDeployment(scope, 'DeployWebsite', {
			sources: [s3deploy.Source.asset(path)],
			destinationBucket: this.s3Bucket,
		});
	}
}