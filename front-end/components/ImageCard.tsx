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
import { IconEdit, IconPencil, IconTrash } from '@tabler/icons'
import theme from 'prism-react-renderer/themes/nightOwl'

const useStyles = createStyles(() => ({
  group: {
    backgroundColor: '#011627',
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
  const { classes } = useStyles()

  const imageCode = JSON.stringify(card)
    .replace(/,(?![^\[]*\])/g, '\n')
    .replace(/\{|\}/g, '')

  return (
    <>
      <Card
        shadow="sm"
        p="lg"
        radius="md"
        withBorder
        maw="500px"
        className={classes.group}
      >
        <Card.Section>
          <Image height={400} src={imagesURLs[index]} alt={card.name} />
        </Card.Section>
        <Card.Section>
          <Prism
            getPrismTheme={() => theme}
            language="yaml"
          >{`{\n${imageCode}\n}`}</Prism>
          <Group position="center" py={16}>
            <Button
              leftIcon={<IconPencil />}
              onClick={() =>
                setOpenedMap({
                  ...openedMap,
                  [index]: true,
                })
              }
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                const newImagesUrls = imagesURLs.slice()
                newImagesUrls.splice(index, 1)
                imageData.splice(index, 1)
                metadata.splice(index, 1)
                setImagesURLs(newImagesUrls)
                setOpenedMap({
                  ...openedMap,
                  [index]: false,
                })
              }}
              leftIcon={<IconTrash />}
              variant="light"
              color="red"
            >
              Delete
            </Button>
          </Group>
        </Card.Section>
      </Card>
    </>
  )
}
