import { Carousel } from '@mantine/carousel'
import { createStyles } from '@mantine/core'
import ImageCard from './ImageCard'

const useStyles = createStyles((_theme, _params, getRef) => ({
  controls: {
    ref: getRef('controls'),
    transition: 'opacity 150ms ease',
    opacity: 0,
  },

  indicators: {
    ref: getRef('indicators'),
    transition: 'opacity 150ms ease',
    opacity: 0,
  },

  root: {
    '&:hover': {
      [`& .${getRef('controls')}`]: {
        opacity: 1,
      },
      [`& .${getRef('indicators')}`]: {
        opacity: 1,
      },
    },
  },
}))

export default function ImageCarousel({
  imagesURLs,
  setImagesURLs,
  imageData,
  openedMap,
  setOpenedMap,
  metadata,
  setMetadata,
}) {
  const { classes } = useStyles()

  const cards = metadata.map((card, index) => {
    return (
      <Carousel.Slide key={card.id}>
        <ImageCard
          card={card}
          index={index}
          imagesURLs={imagesURLs}
          setImagesURLs={setImagesURLs}
          imageData={imageData}
          openedMap={openedMap}
          setOpenedMap={setOpenedMap}
          metadata={metadata}
          setMetadata={setMetadata}
        />
      </Carousel.Slide>
    )
  })

  return (
    <Carousel
      classNames={classes}
      slideSize="60%"
      miw="400px"
      align="start"
      slideGap="xl"
      breakpoints={[{ maxWidth: 'xs', slideSize: '100%', slideGap: 2 }]}
      withIndicators
    >
      {cards}
    </Carousel>
  )
}
