import { SimpleGrid, Image, createStyles, Title, Box } from '@mantine/core'
import { randomId } from '@mantine/hooks'
import ImageModal from './ImageModal'

const useStyles = createStyles(() => ({
  container: {
    margin: 50,
  },
  title: {
    marginTop: 50,
    textAlign: 'center',
  },
  control: {
    position: 'absolute',
    width: 250,
    left: 'calc(50% - 125px)',
    marginBottom: 50,
  },
}))

export default function ImageGrid({
  imagesURLs,
  setImagesURLs,
  imageData,
  openedMap,
  setOpenedMap,
}) {
  const { classes } = useStyles()

  const images = imagesURLs.map((imageSrc: string, i: number) => {
    return (
      <Box key={randomId()}>
        <Image
          sx={{ cursor: 'pointer' }}
          mx="auto"
          radius="sm"
          width={200}
          src={imageSrc}
          onClick={() =>
            setOpenedMap({
              ...openedMap,
              [i]: true,
            })
          }
        />
        <ImageModal
          index={i}
          imagesURLs={imagesURLs}
          setImagesURLs={setImagesURLs}
          imageData={imageData}
          setOpenedMap={setOpenedMap}
          openedMap={openedMap}
          imageSrc={imageSrc}
        />
      </Box>
    )
  })

  return (
    <>
      {imagesURLs.length > 0 && (
        <Title className={classes.title} order={2}>
          Images
        </Title>
      )}
      <SimpleGrid
        className={classes.container}
        cols={imagesURLs.length <= 4 ? imagesURLs.length : 4}
        spacing="lg"
        breakpoints={[
          {
            maxWidth: 'md',
            cols: imagesURLs.length <= 3 ? imagesURLs.length : 3,
            spacing: 'md',
          },
          {
            maxWidth: 'sm',
            cols: imagesURLs.length <= 2 ? imagesURLs.length : 2,
            spacing: 'sm',
          },
          {
            maxWidth: 'xs',
            cols: 1,
            spacing: 'sm',
          },
        ]}
      >
        {images}
      </SimpleGrid>
    </>
  )
}
