import { SessionProvider } from 'next-auth/react'
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function App({ Component, pageProps:{session, ...pageProps} }) {
  return (
      <SessionProvider session={session}>
         <Component {...pageProps} />
      </SessionProvider>
   );
}