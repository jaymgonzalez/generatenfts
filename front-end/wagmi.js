import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { createClient, chain, configureChains } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

const localhostChain = {
  id: 31337,
  name: 'Hardhat',
  network: 'localhost',
  nativeCurrency: {
    decimals: 18,
    name: 'Polygon',
    symbol: 'MATIC',
  },
  rpcUrls: {
    default: {
      http: `http://localhost:8545/`,
    },
  },
  testnet: true,
}

export const { chains, provider } = configureChains(
  [chain.polygonMumbai, chain.polygon, localhostChain],
  [
    alchemyProvider({
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_MUMBAI_API_KEY,
    }),
    publicProvider(),
    // jsonRpcProvider({
    //   rpc: () => ({
    //     http: `http://localhost:8545/`,
    //   }),
    // }),
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
