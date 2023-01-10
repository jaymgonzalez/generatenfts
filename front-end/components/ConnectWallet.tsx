import { Flex, Title } from '@mantine/core'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function ConnectWallet() {
  return (
    <Flex gap="md" align="center" direction="column">
      <Title order={3}>Please connect your wallet</Title>
      <ConnectButton />
    </Flex>
  )
}
