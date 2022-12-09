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
        {/* <Modal
          opened={openedMap[i] || false}
          onClose={() => {
            setOpenedMap({
              ...openedMap,
              [i]: false,
            })
          }}
        >
          <Image mx="auto" radius="sm" width={400} src={imageSrc} />
          <Center py="lg">
            <Button
              rightIcon={<IconX size={18} stroke={1.5} />}
              color="red"
              onClick={() => {
                const newImagesUrls = imagesURLs.slice()
                newImagesUrls.splice(i, 1)
                imageData.splice(i, 1)
                setImagesURLs(newImagesUrls)
                setOpenedMap({
                  ...openedMap,
                  [i]: false,
                })
              }}
            >
              Remove
            </Button>
          </Center>
          <ImageForm
            index={i}
            imagesURLs={imagesURLs}
            imageData={imageData}
            setOpenedMap={setOpenedMap}
            openedMap={openedMap}
          ></ImageForm>
        </Modal> */}
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
