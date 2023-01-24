import {
  createStyles,
  Menu,
  Group,
  UnstyledButton,
  Box,
  Text,
  ThemeIcon,
  Loader,
  Badge,
  MediaQuery,
} from '@mantine/core'
import {
  IconChevronDown,
  IconChevronUp,
  IconAlertTriangle,
} from '@tabler/icons'
import { Matic, Testnet } from '@web3uikit/icons'

const iconMap = {
  80001: <Matic fontSize="20px" />,
  137: <Matic fontSize="20px" />,
  1337: <Testnet fontSize="20px" />,
}

const useStyles = createStyles((theme, _params, getRef) => ({
  group: {
    borderRadius: theme.radius.md,
    '&:hover': {
      backgroundColor: theme.colors.gray[9],
      [`& .${getRef('child')}`]: {
        backgroundColor: theme.colors.gray[9],
      },
    },
  },
  buttonList: {
    borderRadius: theme.radius.md,
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },
  icon: {
    border: 0,
  },
  iconMenu: {
    ref: getRef('child'),
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    border: 0,
  },
}))

export default function NetworkButton({
  chain,
  chains,
  isLoading,
  switchNetwork,
  pendingChainId,
  opened,
  onChange,
}) {
  const { classes, theme } = useStyles()

  const chainMap = chains.map((_chain) => {
    return (
      <Group
        className={classes.group}
        key={_chain.id}
        onClick={() => switchNetwork?.(_chain.id)}
      >
        <UnstyledButton className={classes.buttonList} mx="sm" py="sm">
          <Group spacing="xs">
            <ThemeIcon variant="default" size="sm" className={classes.iconMenu}>
              {iconMap[_chain.id]}
            </ThemeIcon>
            <Text color="white" size="sm" weight="200" mr="2" fw={600} lts={0}>
              {_chain.name}
            </Text>
          </Group>
          {_chain.id === chain?.id && !isLoading && (
            <Badge color="green" variant="dot" size="xs" my="auto" ml={64}>
              Connected
            </Badge>
          )}
          {_chain.id === chain?.id && isLoading && (
            <Badge color="yellow" variant="dot" size="xs" my="auto" ml={64}>
              Changing
            </Badge>
          )}
          {isLoading && pendingChainId === _chain.id && <Loader size="sm" />}
        </UnstyledButton>
      </Group>
    )
  })

  return (
    <Menu
      offset={12}
      radius="md"
      position="bottom-end"
      transition="pop-top-right"
      opened={opened}
      onChange={onChange}
    >
      <Menu.Target>
        <Box
          sx={(theme) => ({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.colors.gray[7],
            borderRadius: theme.radius.md,
            border: '1px solid transparent',
            borderColor: theme.colors.gray[7],
            maring: '1px',
            cursor: 'pointer',
            '&:hover': {
              border: '1px',
              borderStyle: 'solid',
              borderColor: theme.colors.blue[4],
              backgroundColor: theme.colors.gray[9],
            },
          })}
          bg="gray.9"
          h={35}
        >
          <Group spacing="xs" px={8}>
            <ThemeIcon variant="default" size="sm" className={classes.icon}>
              {!chain.unsupported ? (
                iconMap[chain.id]
              ) : (
                <IconAlertTriangle fontSize="20px" />
              )}
            </ThemeIcon>
            <MediaQuery query="(max-width: 900px)" styles={{ display: 'none' }}>
              <Text size="sm" weight="600">
                {' '}
                {!chain.unsupported ? chain.name : 'Unsupported'}
              </Text>
            </MediaQuery>
            {!opened ? (
              <IconChevronDown size={16} stroke={1.5} />
            ) : (
              <IconChevronUp size={16} stroke={1.5} />
            )}
          </Group>
        </Box>
      </Menu.Target>
      <Menu.Dropdown
        sx={() => ({
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
          minWidth: 250,
        })}
      >
        <Menu.Label>Networks</Menu.Label>
        {chainMap}
      </Menu.Dropdown>
    </Menu>
  )
}
