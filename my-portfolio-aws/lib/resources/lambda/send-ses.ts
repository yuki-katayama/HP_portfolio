'use strict'
import * as SDK from 'aws-sdk';
import { SesForm } from '../../models';
import {load} from 'ts-dotenv'

export const lambdaHandler = (event: SesForm, context: any, callback: any) => {
    const ses = new SDK.SES({ region: 'ap-northeast-1' });
    const ToAddress = [event.adminEmail]
    const FromAddress = event.adminEmail
    const email = {
        Source: FromAddress,
        Destination: {
            ToAddresses: ToAddress
        },
        Message: {
            Subject: { Data: "フォームからのお問い合わせ" },
            Body: {
                Text: { Data: [
                    '[お問い合わせ表題] : ' + event.name,
                    '[メールアドレス] : ' + event.email,
                    '[お問い合わせ本文] : ' + event.content
                ].join("\n")}
            },
        },
    };
    ses.sendEmail(email, callback);
};