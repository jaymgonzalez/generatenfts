import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { createClient, chain, configureChains } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

export const { chains, provider } = configureChains(
  [chain.polygonMumbai, chain.polygon],
  [
    alchemyProvider({
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_MUMBAI_API_KEY,
    }),
    publicProvider(),
  ]
)

const { connectors } = getDefaultWallets({
  appName: 'Generate your NFT minting dApp',
  chains,
})

export const client = createClient({
  autoConnect: false,
  connectors,
  provider,
})
