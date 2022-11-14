'use strict'
// const SDK = require('aws-sdk');
import { Context, APIGatewayProxyCallback, APIGatewayEvent } from 'aws-lambda';


// export const handler = (event: APIGatewayEvent, context: any, callback: any) => {
//     const body = event.bodyJson
//     const ses = new SDK.SES({ region: 'ap-northeast-1' });
//     const ToAddress = 'katayu810@gmail.com'
//     const FromAddress = 'katayu810@gmail.com'
//     const email = {
//         Source: FromAddress,
//         Destination: {
//             ToAddresses: [ ToAddress ]
//         },
//         Message: {
//             Subject: { Data: "フォームからのお問い合わせ" },
//             Body: {
//                 Text: { Data: [
//                     '[お問い合わせ表題] : ' + body.name,
//                     '[メールアドレス] : ' + body.email,
//                     '[お問い合わせ本文] : ' + body.content
//                 ].join("\n")}
//             },
//         },
//     };
//     ses.sendEmail(email, callback);
// };


export const lambdaHandler = (event: APIGatewayEvent, context: Context, callback: APIGatewayProxyCallback): void => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);
    callback(null, {
        statusCode: 200,
        body: JSON.stringify({
            message: 'hello world',
        }),
    });
};