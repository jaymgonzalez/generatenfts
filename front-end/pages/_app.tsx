import { useEffect, useState } from 'react'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { type AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core'
import { WagmiConfig } from 'wagmi'
import { client, chains } from '../wagmi'
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { RainbowKitSiweNextAuthProvider } from '@rainbow-me/rainbowkit-siwe-next-auth'

import Navbar from '../components/Navbar'

import '@rainbow-me/rainbowkit/styles.css'

export default function App(props: AppProps<{ session: Session }>) {
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
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme: 'dark',
            cursorType: 'default',
            fontFamily: 'Roboto, sans-serif',
            // breakpoints: {
            //   xs: 500,
            //   sm: 800,
            //   md: 1000,
            //   lg: 1200,
            //   xl: 1400,
            // },
          }}
        >
          <WagmiConfig client={client}>
            <SessionProvider session={pageProps.session} refetchInterval={0}>
              <RainbowKitSiweNextAuthProvider>
                <RainbowKitProvider
                  theme={darkTheme({
                    accentColor: '#1971C2',
                    accentColorForeground: 'white',
                    fontStack: 'system',
                  })}
                  modalSize="compact"
                  chains={chains}
                >
                  <Navbar />
                  <Component {...pageProps} />
                </RainbowKitProvider>
              </RainbowKitSiweNextAuthProvider>
            </SessionProvider>
          </WagmiConfig>
        </MantineProvider>
      </>
    )
  }
}
