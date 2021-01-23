import '../styles/globals.css';
import { GeistProvider, CssBaseline } from '@geist-ui/react';
import Head from 'components/head';

function MyApp({ Component, pageProps }) {
  return (
    <GeistProvider theme={{ type: 'dark' }}>
      <CssBaseline />
      <Head />
      <Component {...pageProps} />
    </GeistProvider>
  );
}

export default MyApp;
