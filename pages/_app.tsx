import 'tailwindcss/tailwind.css'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { Header } from '../components/Header'
import { Nav } from '../components/Nav'
import { ChakraProvider } from '@chakra-ui/react'
import { UserContextProvider } from '../context/UserContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="keywords" content="Next.js, React, JavaScript" />
        <meta name="author" content="Danny Kimble" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Sim Racing Tracker</title>
        <meta name="description" content="Day to Day Journal app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UserContextProvider>
        <Header />
        <div className="flex">
          <Nav />
          <ChakraProvider>
            <div className="p-3">
              <Component {...pageProps} />
            </div>
          </ChakraProvider>
        </div>
      </UserContextProvider>
    </>
  )
}

export default MyApp
