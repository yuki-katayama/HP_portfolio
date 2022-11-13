import * as cdk from 'aws-cdk-lib';
import * as MyPortfolioAws from '../lib/my-portfolio-aws-stack';
import { Template } from 'aws-cdk-lib/assertions';
// import * as MyPortfolioAws from '../lib/my-portfolio-aws-stack';


const app = new cdk.App();
const stack = new MyPortfolioAws.MyPortfolioAwsStack(app, 'MyTestStack');
// THEN
const template = Template.fromStack(stack).toJSON();
test('Snapshot Is Correct', () => {
	expect(template).toMatchSnapshot();
})

test('S3 Bucket Created', () => {
});
// test('SQS Queue Created', () => {
//   const app = new cdk.App();
//     // WHEN
//   const stack = new MyPortfolioAws.MyPortfolioAwsStack(app, 'MyTestStack');
//     // THEN
//   const template = Template.fromStack(stack);

//   template.hasResourceProperties('AWS::SQS::Queue', {
//     VisibilityTimeout: 300
//   });
// });

