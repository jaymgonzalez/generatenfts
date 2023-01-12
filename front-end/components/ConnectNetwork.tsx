import { Box, Flex, Title } from '@mantine/core'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function ConnectNetwork() {
  return (
    <Box h="100vh">
      <Flex gap="md" justify="center" align="center" direction="column" h="80%">
        <Title order={3}>Please change the network</Title>
        <ConnectButton />
      </Flex>
    </Box>
  )
}
