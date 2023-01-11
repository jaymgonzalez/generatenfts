import { Flex, Title } from '@mantine/core'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function ConnectNetwork() {
  return (
    <Flex gap="md" align="center" direction="column">
      <Title order={3}>Please change the network</Title>
      <ConnectButton />
    </Flex>
  )
}
