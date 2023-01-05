import { Card, Image, Button, Group, createStyles } from '@mantine/core'
import { Prism } from '@mantine/prism'
import { IconPencil, IconTrash } from '@tabler/icons'
import theme from 'prism-react-renderer/themes/nightOwl'
import { useDispatch, useSelector } from 'react-redux'
import {
  setImageUrls,
  selectImagesUrls,
  setImageMetadata,
  selectImagesMetadata,
  setNftMetadata,
} from '../store/slices/imageSlice'

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
  embla,
}) {
  const { classes } = useStyles()

  const reduxImagesUrls = useSelector(selectImagesUrls)
  const reduxImagesMetadata = useSelector(selectImagesMetadata)

  const dispatch = useDispatch()

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
          <Image height={400} src={reduxImagesUrls[index]} alt={card.name} />
        </Card.Section>
        <Card.Section
          onMouseEnter={embla && (() => embla.reInit({ draggable: false }))}
          onMouseLeave={embla && (() => embla.reInit({ draggable: true }))}
        >
          <Prism
            getPrismTheme={() => theme}
            language="yaml"
          >{`{\n${imageCode}\n}`}</Prism>
          <Group position="center" py={16}>
            <Button
              leftIcon={<IconPencil />}
              variant="outline"
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
                const newImagesUrls = reduxImagesUrls.slice()
                newImagesUrls.splice(index, 1)

                const newImageMetadata = reduxImagesMetadata.slice()
                newImageMetadata.splice(index, 1)

                dispatch(setImageUrls(newImagesUrls))
                dispatch(setImageMetadata(newImageMetadata))
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
