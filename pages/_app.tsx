import type { AppProps } from 'next/app';

import '../styles/globals.css';
import Head from 'next/head';
// import Header from './components/Header';
import { ChakraProvider } from '@chakra-ui/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="keywords" content="Next.js, React, JavaScript" />
        <meta name="author" content="Danny Kimble" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Head>
        <title>Sim Racing Tracker</title>
        <meta name="description" content="Sim racing time rtr" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
