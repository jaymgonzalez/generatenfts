import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Box,
  createStyles,
} from '@mantine/core'
import { Prism } from '@mantine/prism'

const useStyles = createStyles((theme) => ({
  group: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },
}))

export default function ImageCard({
  card,
  index,
  imagesURLs,
  setImagesURLs,
  imageData,
  openedMap,
  setOpenedMap,
  metadata,
  setMetadata,
}) {
  // console.log(JSON.parse(JSON.stringify(card)))

  // const imageCode = Object.keys(card).map(
  //   (key) => `${key}: ${card[key]}
  // `
  // )

  const imageCode = JSON.stringify(card)
    .replace(/,/g, '\n')
    .replace(/\{|\}/g, '')

  // console.log(imageCode)

  const { classes } = useStyles()

  return (
    <Card
      shadow="sm"
      p="lg"
      radius="md"
      withBorder
      maw="500px"
      className={classes.group}
    >
      <Card.Section>
        <Image
          height={400}
          src={imagesURLs[index]}
          alt={card.name}
          // fit="contain"
        />
      </Card.Section>
      <Card.Section>
        <Prism language="yaml">{`{\n${imageCode}\n}`}</Prism>
        <Group position="center" py={16}>
          <Button>holi</Button>
          <Button>chusi</Button>
        </Group>
      </Card.Section>
    </Card>
  )
}
