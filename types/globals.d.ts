/// <reference types="vite/client" />
declare global {

  interface AppConfig {
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
      I18N_DEBUG: string;
      SENTRY_DSN: string;
    }
  }
}

export {};
