import { AppProps } from 'next/app'
import Head from 'next/head'
import { MantineProvider } from '@mantine/core'
import { WagmiConfig } from 'wagmi'
import Navbar from '../components/Navbar'
import { client } from '../wagmi'
import { useEffect, useState } from 'react'

export default function App(props: AppProps) {
  const { Component, pageProps } = props

  const [showChild, setShowChild] = useState(false)

  useEffect(() => {
    setShowChild(true)
  }, [])

  if (!showChild) {
    return null
  }
  if (typeof window === 'undefined') {
    return <></>
  } else {
    return (
      <>
        <WagmiConfig client={client}>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              /** Put your mantine theme override here */
              colorScheme: 'dark',
              // breakpoints: {
              //   xs: 500,
              //   sm: 800,
              //   md: 1000,
              //   lg: 1200,
              //   xl: 1400,
              // },
            }}
          >
            <Navbar />
            <Component {...pageProps} />
          </MantineProvider>
        </WagmiConfig>
      </>
    )
  }
}
