import { Button, Center, Text } from '@mantine/core'
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import AuthenticatedPage from '../components/Authenticated'

import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from '@rainbow-me/rainbowkit'
import NetworkButton from '../components/NetworkButton'

export default function About() {
  const { address } = useAccount()

  const { chain } = useNetwork()
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork()

  return (
    <>
      {/* <AuthenticatedPage address={address}> */}
      <Center>
        <Text>ABOUT</Text>
      </Center>
    </>
  )
}
