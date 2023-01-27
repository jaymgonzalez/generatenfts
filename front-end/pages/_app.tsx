import { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { wrapper } from '../store/store'
import { MantineProvider } from '@mantine/core'
import { WagmiConfig } from 'wagmi'
import { client, chains } from '../wagmi'
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { NotificationsProvider } from '@mantine/notifications'
// import { RainbowKitSiweNextAuthProvider } from '@rainbow-me/rainbowkit-siwe-next-auth'
// import { SessionProvider } from 'next-auth/react'
// import { Session } from 'next-auth'
// import { type AppProps } from 'next/app'

import '@rainbow-me/rainbowkit/styles.css'
import Head from 'next/head'

export default function App(props) {
  // props: AppProps<{ session: Session }>
  const { Component, pageProps, ...rest } = props

  const { store } = wrapper.useWrappedStore(rest)

  const [showChild, setShowChild] = useState(false)

  useEffect(() => {
    setShowChild(true)
  }, [])

  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault()
      event.returnValue = ''
      return ''
    }

    window.addEventListener('beforeunload', unloadCallback)
    return () => window.removeEventListener('beforeunload', unloadCallback)
  }, [])

  if (!showChild) {
    return null
  }
  if (typeof window === 'undefined') {
    return <></>
  } else {
    return (
      <>
        <Provider store={store}>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              globalStyles: (theme) => ({
                body: {
                  maxWidth: theme.breakpoints.xl,
                  margin: '0 auto',
                },
              }),

              /** Put your mantine theme override here */
              colorScheme: 'dark',
              cursorType: 'default',
              fontFamily: 'Roboto, sans-serif',
              breakpoints: {
                sm: 640,
                md: 768,
                lg: 1024,
                xl: 1280,
              },
            }}
          >
            <NotificationsProvider autoClose={4500} limit={5}>
              <WagmiConfig client={client}>
                {/* <SessionProvider session={pageProps.session} refetchInterval={0}>  <RainbowKitSiweNextAuthProvider> */}
                <RainbowKitProvider
                  theme={darkTheme({
                    accentColor: 'rgba(34, 139, 230, 0.15)',
                    accentColorForeground: '#C1C2C5',
                    fontStack: 'rounded',
                    overlayBlur: 'large',
                    borderRadius: 'medium',
                  })}
                  modalSize="compact"
                  chains={chains}
                >
                  <Head>
                    <title>Generate NFT</title>
                    <meta
                      name="description"
                      content="GenerateNFTs.xyz - IMG to NFT dApp"
                    />
                    <link rel="icon" href="/favicon.ico" />
                  </Head>
                  <Component {...pageProps} />
                </RainbowKitProvider>
                {/* </RainbowKitSiweNextAuthProvider> </SessionProvider> */}
              </WagmiConfig>
            </NotificationsProvider>
          </MantineProvider>
        </Provider>
      </>
    )
  }
}
