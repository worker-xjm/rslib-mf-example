/// <reference types="react-scripts" />



interface ImportMetaEnv {
    readonly PUBLIC_SSO_LOGIN_URL: string;
    readonly PUBLIC_SERVER_VIRTUAL_PATH: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

declare namespace NodeJS {
    interface ProcessEnv extends ImportMetaEnv { }
}