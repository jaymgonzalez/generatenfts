import { useState } from 'react'
import { Button, Group, Alert, Modal, Text } from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons'
import { Metamask } from '@web3uikit/icons'
import Link from 'next/link'
import { Matic } from '@web3uikit/icons'

function addMaticNetwork() {
  try {
    window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: '0x13881',
          rpcUrls: ['https://matic-mumbai.chainstacklabs.com/'],
          chainName: 'Mumbai',
          nativeCurrency: {
            name: 'MATIC',
            symbol: 'MATIC',
            decimals: 18,
          },
          blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
        },
      ],
    })
  } catch (error) {
    console.log(error)
  }
}

export default function WIPOverlay() {
  const [opened, setOpened] = useState(true)

  return (
    opened && (
      <>
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          withCloseButton={false}
        >
          <Alert
            icon={<IconAlertCircle size={16} />}
            title="Site under construnction!"
            color="yellow"
          >
            <Text align="center">
              There are parts of the site still under construction
            </Text>
            <Text align="center">🚧👷🏽‍♀️👷🏽‍♂️🚧</Text>
            <Text
              align="center"
              sx={(theme) => ({
                a: {
                  textDecoration: 'none',
                  color:
                    theme.colorScheme === 'dark'
                      ? theme.colors.blue[4]
                      : theme.colors.gray[3],
                },
              })}
            >
              Please check our guide on how the app works{' '}
              <Link href="/guide">here</Link>
            </Text>
            <Text align="center">
              At the moment, only live on Polygon Mumbai.
            </Text>
            <Text align="center">
              Use the buttons bellow to add the network to your Metamask and
              claim some TEST MATIC.
            </Text>
          </Alert>
          <Group position="center" py={16}>
            <Button
              variant="outline"
              leftIcon={<Metamask fontSize={20} />}
              onClick={() => addMaticNetwork()}
            >
              Add Polygon Mumbai network to Metamask
            </Button>
          </Group>
          <Group position="center" pb={16}>
            <Button
              component="a"
              variant="outline"
              leftIcon={<Matic fontSize={20} />}
              target="_blank"
              href="https://mumbaifaucet.com/"
            >
              Add Test Matic to your wallet
            </Button>
          </Group>
        </Modal>
      </>
    )
  )
}
