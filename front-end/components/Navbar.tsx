import { Contract, providers, utils } from 'ethers'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

import {
  createStyles,
  Menu,
  Center,
  Header,
  Container,
  Group,
  Button,
  Burger,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconChevronDown } from '@tabler/icons'
import AccountMenu from './AccountMenu'
import CustomConnectButton from './ConnectButton'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'

const HEADER_HEIGHT = 60

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: 5,
  },
}))

interface HeaderActionProps {
  links: {
    link: string
    label: string
    links: { link: string; label: string }[]
  }[]
}

const links = [
  {
    link: '/',
    label: 'Home',
  },
  {
    link: '#1',
    label: 'CreateNFT',
    links: [
      {
        link: '/upload',
        label: 'Upload Images',
      },
      {
        link: '/resources',
        label: 'Resources',
      },
      {
        link: '/community',
        label: 'Community',
      },
      {
        link: '/blog',
        label: 'Blog',
      },
    ],
  },
  {
    link: '/about',
    label: 'About',
  },
  {
    link: '/pricing',
    label: 'Pricing',
  },
  {
    link: '#2',
    label: 'Support',
    links: [
      {
        link: '/faq',
        label: 'FAQ',
      },
      {
        link: '/demo',
        label: 'Book a demo',
      },
      {
        link: '/forums',
        label: 'Forums',
      },
    ],
  },
]

export default function Navbar() {
  const { classes } = useStyles()
  const [opened, { toggle }] = useDisclosure(false)
  const [walletConnected, setWalletConnected] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { address } = useAccount()

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>
        <Link href={item.link} className={classes.link}>
          {item.label}
        </Link>
      </Menu.Item>
    ))

    if (menuItems) {
      return (
        <>
          <Menu key={link.label} trigger="hover" exitTransitionDuration={0}>
            <Menu.Target>
              <Link
                href={link.link}
                className={classes.link}
                // onClick={(event) => event.preventDefault()}
              >
                <Center>
                  <span className={classes.linkLabel}>{link.label}</span>
                  <IconChevronDown size={12} stroke={1.5} />
                </Center>
              </Link>
            </Menu.Target>
            <Menu.Dropdown>{menuItems}</Menu.Dropdown>
          </Menu>
        </>
      )
    }

    return (
      <Link
        key={link.label}
        href={link.link}
        className={classes.link}
        // onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Link>
    )
  })

  // const connectWallet = async () => {
  //   try {
  //     // Get the provider from web3Modal, which in our case is MetaMask
  //     // When used for the first time, it prompts the user to connect their wallet
  //     await getProviderOrSigner()
  //     setWalletConnected(true)
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }

  // const getProviderOrSigner = async (needSigner = false) => {
  //   const web3Provider = new providers.Web3Provider(provider)

  //   // If user is not connected to the Goerli network, let them know and throw an error
  //   const { chainId } = await web3Provider.getNetwork()
  //   if (chainId !== 5) {
  //     window.alert('Change the network to Goerli')
  //     throw new Error('Change network to Goerli')
  //   }

  //   if (needSigner) {
  //     const signer = web3Provider.getSigner()
  //     return signer
  //   }
  //   return web3Provider
  // }

  return (
    <Header
      height={HEADER_HEIGHT}
      bg="gray.8"
      sx={{ borderBottom: 0 }}
      mb={120}
    >
      <Container className={classes.inner} fluid>
        <Group>
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          />
        </Group>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>
        {address && (
          <AccountMenu opened={isOpen} onChange={setIsOpen} address={address}>
            <CustomConnectButton address={address} isOpen={isOpen} />
          </AccountMenu>
        )}
        {!address && <ConnectButton />}
      </Container>
    </Header>
  )
}
