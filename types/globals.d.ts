/// <reference types="vite/client" />
declare global {

  interface AppConfig {
    splitToken: string;
    isProduction: boolean;
    visitorId: string;
    version: string;
    sentryDsn: string;
  }

  interface Window {
    appConfig: AppConfig;
    locale: string;
  }

  namespace NodeJS {
    interface ProcessEnv {
      APP_DOMAIN: string;
      AUTH0_CLIENT_ID: string;
      AUTH0_CLIENT_SECRET: string;
      AUTH0_DOMAIN: string;
      NODE_ENV: string;
      SESSION_SECRET: string | undefined
      SPLIT_SERVER_TOKEN: string;
      I18N_DEBUG: string;
      SENTRY_DSN: string;
    }
  }
}

export {};
