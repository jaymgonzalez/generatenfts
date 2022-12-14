import { Carousel } from '@mantine/carousel'
import { createStyles } from '@mantine/core'
import { useEffect } from 'react'
import ImageCard from './ImageCard'
import ImageModal from './ImageModal'

console.log(Carousel)

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

  indicator: {
    marginBottom: 44,
    width: 12,
    height: 4,
    transition: 'width 250ms ease',

    '&[data-active]': {
      width: 40,
    },
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
        <ImageModal
          index={index}
          imagesURLs={imagesURLs}
          setImagesURLs={setImagesURLs}
          imageData={imageData}
          setOpenedMap={setOpenedMap}
          openedMap={openedMap}
          imageSrc={imageData[index]?.url}
        />
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
    <>
      <Carousel
        classNames={classes}
        slideSize="45%"
        miw="400px"
        align="start"
        slideGap="md"
        breakpoints={[{ maxWidth: 'xs', slideSize: '100%', slideGap: 2 }]}
        withIndicators
        draggable={false}
      >
        {cards}
      </Carousel>
    </>
  )
}
