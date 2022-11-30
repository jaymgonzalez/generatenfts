import { Contract, providers, utils } from 'ethers'
import { useEffect, useRef, useState } from 'react'
import { Flex, Button, Box, Text } from '@mantine/core'
import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import Link from 'next/link'
import Web3Modal from 'web3modal'
import { log } from 'console'

export default function ConnectButton() {
  const { address } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()
  const { data, isError, isLoading } = useBalance({
    address,
  })

  const [walletConnected, setWalletConnected] = useState(false)
  const web3ModalRef: any = useRef()

  return address ? (
    <Flex
      direction="column"
      align="center"
      justify="center"
      h="100vh"
      bg="gray.9"
    >
      <Box>
        <Text color="white" size="md">
          Connected to {address}
        </Text>
        <Text color="white" size="md">
          Balance: {data?.formatted} {data?.symbol}
        </Text>
      </Box>
      <Button onClick={() => disconnect()}>Disconnect</Button>
    </Flex>
  ) : (
    <Button onClick={() => connect()}>Connect to a wallet</Button>
  )
}
