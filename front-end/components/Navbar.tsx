import { useState } from 'react'
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
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import NetworkButton from './NetworkButton'

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
    link: '/generate',
    label: 'Generate NFT',
  },
  {
    link: '/gallery',
    label: 'NFT Gallery',
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
  const [isOpen, setIsOpen] = useState(false)
  const [networkOpened, setNetworkOpened] = useState(false)
  const { address } = useAccount()
  const { chain } = useNetwork()
  const { chains, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork()

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
              <Link href={link.link} className={classes.link}>
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
      <Link key={link.label} href={link.link} className={classes.link}>
        {link.label}
      </Link>
    )
  })

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
        <Group>
          {address && (
            <NetworkButton
              chain={chain}
              chains={chains}
              isLoading={isLoading}
              switchNetwork={switchNetwork}
              pendingChainId={pendingChainId}
              opened={networkOpened}
              onChange={setNetworkOpened}
            />
          )}
          {address && (
            <AccountMenu opened={isOpen} onChange={setIsOpen} address={address}>
              <CustomConnectButton address={address} isOpen={isOpen} />
            </AccountMenu>
          )}
          {!address && <ConnectButton />}
        </Group>
      </Container>
    </Header>
  )
}
