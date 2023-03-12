import Layout from '@/components/layouts/Layout';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { SessionProvider } from "next-auth/react";
import type { AppProps } from 'next/app';
import './globals.css';
config.autoAddCss = false;

export default function App({ Component, pageProps:{session, ...pageProps} }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </SessionProvider>
  );
}
