import { Carousel, Embla } from '@mantine/carousel'
import { createStyles } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectImagesMetadata } from '../store/slices/imageSlice'
import ImageCard from './ImageCard'
import ImageModal from './ImageModal'

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

  control: {
    height: '100%',
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
  const [embla, setEmbla] = useState<Embla | null>(null)

  const reduxImagesMetadata = useSelector(selectImagesMetadata)

  const cards = reduxImagesMetadata.map((card, index) => {
    return (
      <Carousel.Slide key={card.id}>
        <ImageModal
          index={index}
          setOpenedMap={setOpenedMap}
          openedMap={openedMap}
          imageSrc={reduxImagesMetadata[index]?.url}
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
          embla={embla}
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
        getEmblaApi={setEmbla}
      >
        {cards}
      </Carousel>
    </>
  )
}
