import {
  Box,
  Button,
  createStyles,
  Group,
  MediaQuery,
  Text,
  ThemeIcon,
} from '@mantine/core'
import { IconChevronDown, IconChevronUp } from '@tabler/icons'
import Identicon from './Identicon'

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
    paddingTop: '6px',
  },
  iconMenu: {
    ref: getRef('child'),
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    border: 0,
  },
}))

const ConnectButton = ({ address, isOpen }) => {
  const { classes, theme } = useStyles()

  return (
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
          <Identicon size={24} />
        </ThemeIcon>
        <MediaQuery query="(max-width: 900px)" styles={{ display: 'none' }}>
          <Text size="md" weight="600">
            {`${address.slice(0, 6)}...${address.slice(
              address.length - 4,
              address.length
            )}`}
          </Text>
        </MediaQuery>
        {!isOpen ? (
          <IconChevronDown size={16} stroke={1.5} />
        ) : (
          <IconChevronUp size={16} stroke={1.5} />
        )}
      </Group>
    </Box>
  )
}

export default ConnectButton
