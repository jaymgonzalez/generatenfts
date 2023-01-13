import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createStyles, Header, Container, Group, Burger } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { showNotification } from '@mantine/notifications'
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { IconUrgent } from '@tabler/icons'

import AccountMenu from './AccountMenu'
import CustomConnectButton from './ConnectButton'
import NetworkButton from './NetworkButton'

const HEADER_HEIGHT = 60

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
    link: '',
    label: 'Support',
    // links: [
    //   {
    //     link: '/faq',
    //     label: 'FAQ',
    //   },
    //   {
    //     link: '/demo',
    //     label: 'Book a demo',
    //   },
    //   {
    //     link: '/contact',
    //     label: 'Contact us',
    //   },
    // ],
  },
]

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

export default function Navbar() {
  const { classes } = useStyles()
  const [opened, { toggle }] = useDisclosure(false)
  const [isOpen, setIsOpen] = useState(false)
  const [networkOpened, setNetworkOpened] = useState(false)
  const { address } = useAccount()
  const { chain } = useNetwork()
  const { chains, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork()

  useEffect(() => {
    chain?.unsupported &&
      showNotification({
        title: 'ATTENTION!',
        color: 'red',
        message: 'Unsupported network. Please change it!',
        icon: <IconUrgent size={20} />,
        styles: (theme) => ({
          title: {
            color: 'red',
            fontSize: '16px',
            fontWeight: 'bold',
          },
          icon: {
            fontSize: '16px',
          },
        }),
      })
  }, [chain?.unsupported])

  const items = links.map((link) => {
    return (
      <Link key={link.label} href={link.link} className={classes.link}>
        {link.label}
      </Link>
    )
  })

  return (
    <Header
      height={HEADER_HEIGHT}
      bg="rgba(0, 0, 0, 0)"
      sx={{ borderBottom: 0 }}
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
