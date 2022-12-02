import {
  createStyles,
  Button,
  Menu,
  Group,
  UnstyledButton,
  Box,
  Text,
  ThemeIcon,
} from '@mantine/core'
import {
  IconTrash,
  IconBookmark,
  IconCalendar,
  IconChevronDown,
  IconCheck,
  IconChevronUp,
} from '@tabler/icons'
import PolygonIcon from './misc/PolygonIcon'

const useStyles = createStyles(() => ({
  icon: {
    border: 0,
  },
}))

export default function NetworkButton({ chain, chains, error, isLoading }) {
  const { classes, theme } = useStyles()
  const menuIconColor =
    theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 5 : 6]

  console.log(chain)

  const chainMap = chains.map((_chain) => {
    // console.log(_chain)

    return (
      <Menu.Item>
        <Group>
          <ThemeIcon variant="default" size="lg" className={classes.icon}>
            <PolygonIcon />
          </ThemeIcon>
          {_chain.name}

          {_chain.id === chain?.id && (
            <ThemeIcon variant="default" size="xs" className={classes.icon}>
              <IconCheck />
            </ThemeIcon>
          )}
        </Group>
      </Menu.Item>
    )
  })

  return (
    <Menu transition="pop" position="bottom-end">
      <Menu.Target>
        <UnstyledButton>
          <Box
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.gray[7]
                  : theme.white,
              borderRadius: theme.radius.md,
              justifyContent: 'center',
            })}
          >
            <Button
              sx={(theme) => ({
                border: '1px solid transparent',
                maring: '1px',
                '&:hover': {
                  border: '1px',
                  borderStyle: 'solid',
                  borderColor: theme.colors.blue[4],
                  backgroundColor: theme.colors.gray[9],
                },
              })}
              bg="gray.9"
              radius="md"
              m={1}
              px={8}
              size="sm"
            >
              <Group spacing="xs">
                <ThemeIcon variant="default" size="sm" className={classes.icon}>
                  <PolygonIcon />
                </ThemeIcon>
                <Text>{chain?.name}</Text>
                {true ? (
                  <IconChevronDown size={16} stroke={1.5} />
                ) : (
                  <IconChevronUp size={16} stroke={1.5} />
                )}
              </Group>
            </Button>
          </Box>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Networks</Menu.Label>
        {chainMap}
      </Menu.Dropdown>
    </Menu>
  )
}
