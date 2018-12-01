export class AppConsts {

    static remoteServiceBaseUrl: string;
    static appBaseUrl = "http://localhost:56983/";
    static appHostUrl = "http://localhost:4200/";
    static appBaseHref: string; // returns angular's base-href parameter value if used during the publish

    static localeMappings: any = [];

    static readonly userManagement = {
        defaultAdminUserName: 'admin'
    };

    static readonly localization = {
        defaultLocalizationSourceName: 'refer'
    };

    static readonly authorization = {
        encrptedAuthTokenName: 'enc_auth_token'
    };
}
