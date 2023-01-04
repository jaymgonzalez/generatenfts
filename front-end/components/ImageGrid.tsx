import { SimpleGrid, Image, createStyles, Title, Box } from '@mantine/core'
import { useSelector } from 'react-redux'
import { selectImagesUrls } from '../store/slices/imageSlice'
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

export default function ImageGrid({ openedMap, setOpenedMap }) {
  const { classes } = useStyles()

  const reduxImages = useSelector(selectImagesUrls)

  const images = reduxImages.map((imageSrc: string, i: number) => {
    return (
      <Box key={imageSrc}>
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
          setOpenedMap={setOpenedMap}
          openedMap={openedMap}
          imageSrc={imageSrc}
        />
      </Box>
    )
  })

  return (
    <>
      {reduxImages.length > 0 && (
        <Title className={classes.title} order={2}>
          Images
        </Title>
      )}
      <SimpleGrid
        className={classes.container}
        cols={reduxImages.length <= 4 ? reduxImages.length : 4}
        spacing="lg"
        breakpoints={[
          {
            maxWidth: 'md',
            cols: reduxImages.length <= 3 ? reduxImages.length : 3,
            spacing: 'md',
          },
          {
            maxWidth: 'sm',
            cols: reduxImages.length <= 2 ? reduxImages.length : 2,
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
