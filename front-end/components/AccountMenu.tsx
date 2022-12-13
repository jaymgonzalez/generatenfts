import axios from 'axios'
import { useEffect, useState } from 'react'
import {
  ActionIcon,
  Box,
  Button,
  Center,
  createStyles,
  Group,
  Menu,
  Text,
  Tooltip,
} from '@mantine/core'
import {
  IconExternalLink,
  IconCopy,
  IconPower,
  IconChevronRight,
} from '@tabler/icons'
import Identicon from './Identicon'
import { useBalance, useDisconnect } from 'wagmi'
import { formatEther } from '@ethersproject/units'

const useStyles = createStyles((theme) => ({
  menu: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    minWidth: 320,
  },
  power: {
    color: theme.colors.red[6],
  },
  header: {
    cursor: 'default',
  },
}))

export default function AccountMenu({ children, opened, onChange, address }) {
  const [usdAmount, setUsdAmount] = useState(0)
  const { classes, theme } = useStyles()
  const { data, isError, isLoading } = useBalance({
    address,
  })
  const { disconnect } = useDisconnect()

  const amount = data?.value
    ? parseFloat(formatEther(data?.value)).toFixed(4)
    : 0

  useEffect(() => {
    if (amount <= 0) setUsdAmount(0)
    else
      axios
        .get(
          `https://api.coinconvert.net/convert/${data?.symbol}/usd?amount=${amount}`
        )
        .then((response) => {
          setUsdAmount(response.data.USD)
        })
        .catch((err) => {
          console.log(err)
          setUsdAmount(0)
        })
  }, [amount])

  return (
    <>
      <Menu
        opened={opened}
        onChange={onChange}
        offset={12}
        radius="md"
        position="bottom-end"
        transition="pop-top-right"
      >
        <Menu.Target>
          <Box>{children}</Box>
        </Menu.Target>

        <Menu.Dropdown className={classes.menu}>
          <Group position="apart" py={6} px={8}>
            <Group spacing="xs" className={classes.header}>
              <ActionIcon variant="transparent">
                <Identicon size={24} />
              </ActionIcon>
              <Text c="white" fw="600">
                {`${address.slice(0, 4)}...${address.slice(
                  address.length - 4,
                  address.length
                )}`}
              </Text>
            </Group>
            <Group spacing="xs">
              <Tooltip label="Copy" position="bottom">
                <ActionIcon variant="default" radius="md" size={36}>
                  <IconCopy size={18} stroke={1.5} />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Explore" position="bottom">
                <ActionIcon variant="default" radius="md" size={36}>
                  <IconExternalLink size={18} stroke={1.5} />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Disconnect" position="bottom">
                <ActionIcon
                  onClick={() => disconnect()}
                  variant="default"
                  radius="md"
                  size={36}
                >
                  <IconPower size={18} className={classes.power} stroke={1.5} />
                </ActionIcon>
              </Tooltip>
            </Group>
          </Group>
          <Center pt={60}>
            <Text color="gray.1" size={32} fw={700} lts={0.1}>
              {amount} {data?.symbol}
            </Text>
          </Center>
          <Center pb={30}>
            <Text c="gray.5" size={16} fw={500} lts={0}>
              {`$${usdAmount.toFixed(2)} USD`}
            </Text>
          </Center>
          <Center pb={60}>
            <Button fullWidth variant="outline" maw={'70%'} radius="md">
              Mint NFT
            </Button>
          </Center>
          <Menu.Divider />
          <Menu.Item rightSection={<IconChevronRight size={14} />}>
            Transactions
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  )
}
