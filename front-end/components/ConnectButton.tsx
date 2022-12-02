import { Box, Button, Group, Text, UnstyledButton } from '@mantine/core'
import { IconChevronDown, IconChevronUp } from '@tabler/icons'
import { ComponentPropsWithoutRef, forwardRef } from 'react'
import Identicon from './Identicon'

interface ConnectButtonProps extends ComponentPropsWithoutRef<'button'> {
  address: string
  isOpen: boolean
}

const ConnectButton = forwardRef<HTMLButtonElement, ConnectButtonProps>(
  ({ address, isOpen }: ConnectButtonProps, ref) => (
    <UnstyledButton ref={ref}>
      <Box
        sx={(theme) => ({
          display: 'flex',
          alignItems: 'center',
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.gray[7] : theme.white,
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
            <Identicon size={24} />
            <Text color="white" size="md" weight="600" mr="2">
              {`${address.slice(0, 6)}...${address.slice(
                address.length - 4,
                address.length
              )}`}
            </Text>
            {!isOpen ? (
              <IconChevronDown size={16} stroke={1.5} />
            ) : (
              <IconChevronUp size={16} stroke={1.5} />
            )}
          </Group>
        </Button>
      </Box>
    </UnstyledButton>
  )
)

export default ConnectButton
