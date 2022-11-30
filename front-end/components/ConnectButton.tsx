import { Contract, providers, utils } from 'ethers'
import { useEffect, useRef, useState } from 'react'
import { Flex, Button, Box, Text } from '@mantine/core'
import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import Link from 'next/link'
import Web3Modal from 'web3modal'
import { formatEther } from '@ethersproject/units'

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
      <Box
        sx={(theme) => ({
          display: 'flex',
          alignItems: 'center',
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.gray[7] : theme.white,
          borderRadius: theme.radius.md,
          justifyContent: 'center',
          // paddingTop: '0',
          // paddingBottom: '0',
        })}
      >
        <Box
          sx={() => ({
            paddingRight: '8px',
            paddingLeft: '8px',
          })}
        >
          <Text color="white" size="md">
            {parseFloat(formatEther(data?.value)).toFixed(4)} {data?.symbol}
          </Text>
        </Box>
        <Button
          sx={(theme) => ({
            border: '1px solid transparent',
            maring: '1px',
            '&:hover': {
              border: '1px',
              borderStyle: 'solid',
              borderColor: theme.colors.blue[4],
              backgroundColor: theme.colors.gray[7],
            },
          })}
          bg="gray.9"
          radius="md"
          m={1}
          px={8}
          size="sm"
        >
          <Text color="white" size="md" weight="600" mr="2">
            {`${address.slice(0, 6)}...${address.slice(
              address.length - 4,
              address.length
            )}`}
          </Text>
        </Button>
      </Box>
      <Button onClick={() => disconnect()}>Disconnect</Button>
    </Flex>
  ) : (
    <Button onClick={() => connect()}>Connect to a wallet</Button>
  )
}
