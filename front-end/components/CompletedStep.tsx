import { Center, Notification } from '@mantine/core'
import { IconCheck, IconX } from '@tabler/icons'

export default function CompletedStep({
  mintData,
  mintIsLoading,
  mintIsSuccess,
  mintIsError,
}) {
  return (
    <>
      <Center>
        {mintIsLoading && (
          <Notification loading title="Generating NFT" disallowClose>
            Please accept the transaction in your wallet
          </Notification>
        )}
        {mintIsSuccess && (
          <Notification
            icon={<IconCheck size={20} />}
            color="teal"
            title="Success"
            disallowClose
            sx={(theme) => ({
              a: {
                textDecoration: 'none',
                color:
                  theme.colorScheme === 'dark'
                    ? theme.colors.blue[4]
                    : theme.colors.gray[3],
                '&:hover': {
                  color: theme.colors.blue[7],
                },
              },
            })}
          >
            Transaction successful! Check it{' '}
            <a
              target="_blank"
              href={`https://mumbai.polygonscan.com/tx/${mintData.hash}`}
            >
              here
            </a>
          </Notification>
        )}
        {mintIsError && (
          <Notification
            icon={<IconX size={20} />}
            color="red"
            title="Error"
            disallowClose
          >
            There has been an error in the transaction, please try again!
          </Notification>
        )}
      </Center>
    </>
  )
}
