import React, { useContext, useState } from 'react';
import { json } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react';
import { withSentry } from '@sentry/remix';
import { useTranslation } from 'react-i18next';
import { ColorModeContext, ColorModeSensor } from '~/components/ColorModeSwitcher';
import { ExposeAppConfig } from '~/components/ExposeAppConfig';
import { NonceContext } from '~/components/NonceContext';
import { useChangeLanguage } from '~/hooks/useChangeLanguage';
import { remixI18next } from '~/i18n';
import { defaultNS } from '~/i18n/i18n.config';
import { createUserSession } from '~/session.server';
import styles from './styles/app.css';
import type { LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import type { ColorMode } from '~/components/ColorModeSwitcher';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'HC Automatic Invoicing UI',
  viewport: 'width=device-width,initial-scale=1'
});

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: styles },
    { rel: 'icon', href: '/_static/favicon.ico', type: 'image/x-icon' }
  ];
};

export const handle = {
  i18n: defaultNS
};

export const loader: LoaderFunction = async ({ request }) => {
  const [locale, packageJson, cookieData] = await Promise.all([
    remixI18next.getLocale(request),
    import('../package.json'),
    createUserSession(request),
  ]);
  return json({
    appConfig: {
      isProduction: process.env.NODE_ENV === 'production',
      visitorId: cookieData.visitorId,
      version: packageJson.default.version,
      sentryDsn: process.env.SENTRY_DSN
    },
    locale: locale,
    colorMode: cookieData.session.get('colorMode')
  }, {
    headers: {
      'Set-Cookie': cookieData.cookie
    }
  });
};

const App = () => {
  const nonce = useContext(NonceContext);
  const { appConfig, locale, colorMode: colorModeFromSession } = useLoaderData<typeof loader>();
  const { i18n } = useTranslation();
  useChangeLanguage(locale);

  const [colorMode, setColorMode] = useState<ColorMode>(colorModeFromSession);

  return (
    <html lang={i18n.language} dir={i18n.dir()} data-version={appConfig.version} className={colorMode}>
      <head>
        <Meta/>
        <Links/>
        <ExposeAppConfig appConfig={appConfig} nonce={nonce}/>
        <ColorModeSensor nonce={nonce}/>
      </head>
      <body>
        <ColorModeContext.Provider
          value={{
            colorMode: colorMode,
            setColorMode: setColorMode
          }}>
          <Outlet
            context={{
              appConfig: appConfig,
              locale: locale
            }}/>
        </ColorModeContext.Provider>
        <ScrollRestoration nonce={nonce}/>
        <Scripts nonce={nonce}/>
        <LiveReload nonce={nonce}/>
      </body>
    </html>
  );
};

export default withSentry(App);
