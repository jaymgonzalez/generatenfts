import { Flex } from '@mantine/core'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import AccountMenu from '../components/AccountMenu'
import ConnectButton from '../components/ConnectButton'
import DumbConnectButton from '../components/DumbButton'

export default function About() {
  const { address } = useAccount()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Flex
        direction="column"
        align="center"
        justify="center"
        h="100vh"
        bg="gray.9"
      >
        <AccountMenu opened={isOpen} onChange={setIsOpen} address={address}>
          <DumbConnectButton address={address} isOpen={isOpen} />
        </AccountMenu>
      </Flex>
    </>
  )
}
