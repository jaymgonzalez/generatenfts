import { AppProps } from 'next/app'
import Head from 'next/head'
import { MantineProvider } from '@mantine/core'
import {
  WagmiConfig,
  createClient,
  chain,
  configureChains,
  defaultChains,
} from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { getDefaultProvider } from 'ethers'
import Navbar from '../components/Navbar'

const { chains, provider } = configureChains(
  [chain.polygonMumbai],
  [
    alchemyProvider({
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_MUMBAI_API_KEY,
    }),
  ]
)

const client = createClient({
  autoConnect: true,
  connectors: [new InjectedConnector({ chains })],
  provider,
})

export default function App(props: AppProps) {
  const { Component, pageProps } = props

  return (
    <>
      <Head>
        <title>Generate NFT</title>
        <meta name="description" content="Whitelist-Dapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
