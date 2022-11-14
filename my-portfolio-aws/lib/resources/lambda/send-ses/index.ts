'use strict'
import * as SDK from 'aws-sdk';

interface APIGateway {
    body: {
        name: string,
        email: string,
        content: string,
    }
}

export const lambdaHandler = (event: APIGateway, context: any, callback: any) => {
    const bodyJson = event.body
    const ses = new SDK.SES({ region: 'ap-northeast-1' });
    const ToAddress = 'katayu810@gmail.com'
    const FromAddress = 'katayu810@gmail.com'
    const email = {
        Source: FromAddress,
        Destination: {
            ToAddresses: [ ToAddress ]
        },
        Message: {
            Subject: { Data: "フォームからのお問い合わせ" },
            Body: {
                Text: { Data: [
                    '[お問い合わせ表題] : ' + bodyJson?.name,
                    '[メールアドレス] : ' + bodyJson.email,
                    '[お問い合わせ本文] : ' + bodyJson.content
                ].join("\n")}
            },
        },
    };
    ses.sendEmail(email, callback);
};