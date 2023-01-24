import { BackgroundImage, Button, Group, Stack, Title } from '@mantine/core'
import Link from 'next/link'
import Navbar from '../components/Navbar'

export default function Home() {
  return (
    <>
      <BackgroundImage src="/imgs/backgroundImage.png" mih={720} h="100vh">
        <Navbar>
          <Stack
            align="flex-start"
            justify="center"
            px={20}
            maw={400}
            pt={120}
            sx={{ lineHeight: '0.5' }}
          >
            <Title
              sx={{ lineHeight: '0.85', fontWeight: 800 }}
              order={1}
              size={54}
              align="center"
            >
              Convert any image into an NFT
            </Title>
            <Title
              order={3}
              align="center"
              size={20}
              py={12}
              sx={{ lineHeight: '1', fontWeight: 700 }}
            >
              Upload your images, add the meta data and get the NFTs in your
              wallet.
            </Title>
            <Group mx="auto" px={28}>
              <Button
                component={Link}
                href="/generate"
                variant="gradient"
                gradient={{ from: 'indigo', to: 'cyan' }}
                size="lg"
                radius="md"
                sx={(theme) => ({
                  transition: 'all .25s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.025)',
                  },
                  a: {
                    textDecoration: 'none',
                    color: theme.colors.blue[1],
                  },
                })}
              >
                Start Now
              </Button>
            </Group>
          </Stack>
        </Navbar>
      </BackgroundImage>
    </>
  )
}
