import { Center, Text } from '@mantine/core'
import { useAccount } from 'wagmi'
import AuthenticatedPage from '../components/Authenticated'

export default function About() {
  const { address } = useAccount()

  return (
    <>
      <AuthenticatedPage address={address}>
        <Center>
          <Text>ABOUT</Text>
        </Center>
      </AuthenticatedPage>
    </>
  )
}
