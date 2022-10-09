import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as MyPortfolioYhAws from '../lib/my-portfolio-yh-aws-stack';

// example test. To run these tests, uncomment this file along with the
// example resource in lib/my-portfolio-yh-aws-stack.ts
test('SQS Queue Created', () => {
  const app = new cdk.App();
//     // WHEN
  const stack = new MyPortfolioYhAws.MyPortfolioYhAwsStack(app, 'MyTestStack');
//     // THEN
  const template = Template.fromStack(stack);

  // console.log(s3.bucketWebsiteUrl);
  template.hasResourceProperties(
    /* default設定 */
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

      "BucketName": "my-port-folio-yh-cdk",
      "WebsiteConfiguration": {
        "IndexDocument": "index.html",
      }}
    );
});

