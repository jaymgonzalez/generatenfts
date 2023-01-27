import { Box, Flex, Title } from '@mantine/core'
import Navbar from '../components/Navbar'

export default function Faqs() {
  return (
    <Navbar>
      <Box h="100vh">
        <Flex
          gap="md"
          justify="center"
          align="center"
          direction="column"
          h="80%"
        >
          <Title order={3}>Under Construction 🏗️🏗️🏗️</Title>
        </Flex>
      </Box>
    </Navbar>
  )
}
