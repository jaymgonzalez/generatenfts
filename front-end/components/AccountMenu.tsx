import {
  ActionIcon,
  Box,
  Button,
  Container,
  createStyles,
  Flex,
  Group,
  Menu,
  Text,
  UnstyledButton,
} from '@mantine/core'
import { IconExternalLink, IconCopy, IconPower } from '@tabler/icons'
import { useAccount } from 'wagmi'
import Identicon from './Identicon'
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
} from '@tabler/icons'

const useStyles = createStyles((theme) => ({
  addressButtons: {
    // display: 'flex',
    // alignItems: 'center',
  },
  address: {
    // position: 'relative',
    display: 'flex',
    // justifyContent: 'start',
    alignItems: 'center',
    // margin: '0',
    // maxWidth: '141px',
  },
  menu: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    minWidth: 320,
    // display: 'flex',
    // justifyContent: 'space-between',
    // width: '100%',
  },
  power: {
    color: theme.colors.red[6],
  },
  buttons: {
    // position: 'relative',
    // display: 'flex',
    // justifyContent: 'start',
    // alignItems: 'left',
    // margin: '0',
    // maxWidth: '141px',
  },
}))

export default function AccountMenu({ children, opened, onChange, address }) {
  const { classes, theme } = useStyles()

  return (
    <>
      <Menu opened={opened} onChange={onChange} offset={12}>
        <Menu.Target>
          <UnstyledButton>{children}</UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown className={classes.menu}>
          <Group className={classes.addressButtons} position="apart" m={2}>
            <Group spacing="xs" className={classes.address}>
              <ActionIcon>
                <Identicon size={24} />
              </ActionIcon>
              <Text c="white" fw="600">
                {`${address.slice(0, 4)}...${address.slice(
                  address.length - 4,
                  address.length
                )}`}
              </Text>
            </Group>
            <Group spacing="xs" className={classes.buttons}>
              <ActionIcon variant="default" radius="md" size={36}>
                <IconCopy size={18} stroke={1.5} />
              </ActionIcon>
              <ActionIcon variant="default" radius="md" size={36}>
                <IconExternalLink size={18} stroke={1.5} />
              </ActionIcon>
              <ActionIcon variant="default" radius="md" size={36}>
                <IconPower size={18} className={classes.power} stroke={1.5} />
              </ActionIcon>
            </Group>
          </Group>
          <Menu.Label>Application</Menu.Label>
          <Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>
          <Menu.Item icon={<IconMessageCircle size={14} />}>Messages</Menu.Item>
          <Menu.Item icon={<IconPhoto size={14} />}>Gallery</Menu.Item>
          <Menu.Item
            icon={<IconSearch size={14} />}
            rightSection={
              <Text size="xs" color="dimmed">
                ⌘K
              </Text>
            }
          >
            Search
          </Menu.Item>

          <Menu.Divider />

          <Menu.Label>Danger zone</Menu.Label>
          <Menu.Item icon={<IconArrowsLeftRight size={14} />}>
            Transfer my data
          </Menu.Item>
          <Menu.Item color="red" icon={<IconTrash size={14} />}>
            Delete my account
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  )
}
