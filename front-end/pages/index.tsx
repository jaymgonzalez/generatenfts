import {
  BackgroundImage,
  Button,
  createStyles,
  Stack,
  Title,
} from '@mantine/core'
import Navbar from '../components/Navbar'

const useStyles = createStyles(() => ({
  center: {
    backgroundImage: "url('/backgroundImage.png')",
    backgroundSize: 'cover',
    height: '100vh',
  },
}))
export default function Home() {
  const { classes, theme } = useStyles()

  return (
    <>
      <BackgroundImage src="/imgs/backgroundImage.png" mih={720} h="100vh">
        <Navbar />
        <Stack
          align="flex-start"
          justify="center"
          px={20}
          maw={400}
          h="80%"
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
          <Button mx="auto">Start Now</Button>
        </Stack>
      </BackgroundImage>
    </>
  )
}
