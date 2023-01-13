import { useState } from 'react'
import {
  Button,
  Group,
  Box,
  Overlay,
  Alert,
  Modal,
  createStyles,
  Text,
  UnstyledButton,
} from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons'
import { Metamask } from '@web3uikit/icons'

const useStyles = createStyles(() => ({
  modal: {
    backgroundColor: 'red',
    // display: 'none',
  },
}))

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
  const { classes, theme } = useStyles()

  return (
    opened && (
      <>
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          // className={classes.modal}
          withCloseButton={false}
        >
          <Alert
            icon={<IconAlertCircle size={16} />}
            title="Site under construnction!"
            color="yellow"
          >
            <Text align="center">
              There are parts of the site still under construction 🚧👷🏽‍♀️👷🏽‍♂️🚧
            </Text>
            <Text align="center">Please proceed with caution.</Text>
            <Text align="center">
              At the moment, only Polygon Mumbai is working.
            </Text>
            <Text align="center">
              Use the button bellow to add it to your Metamask.
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
        </Modal>
      </>
    )
  )
}
