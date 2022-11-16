export interface SesForm {
    adminEmail: string,
    name: string,
    email: string,
    content: string,
}

export type KindOfLambda = 'send-ses';

export interface ConnectLambdaToSes {
    roleName: string,
    lambdaName: string,
    dirName: KindOfLambda;
}
