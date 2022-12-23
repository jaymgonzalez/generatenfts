import { Image, Modal } from '@mantine/core'
import ImageForm from './ImageForm'

export default function ImageModal({
  imagesURLs,
  setImagesURLs,
  imageData,
  openedMap,
  setOpenedMap,
  imageSrc,
  index,
}) {
  return (
    <Modal
      opened={openedMap[index] || false}
      onClose={() => {
        setOpenedMap({
          ...openedMap,
          [index]: false,
        })
      }}
    >
      <Image py="lg" mx="auto" radius="sm" src={imageSrc} />
      <ImageForm
        index={index}
        imagesURLs={imagesURLs}
        imageData={imageData}
        setOpenedMap={setOpenedMap}
        openedMap={openedMap}
        setImagesURLs={setImagesURLs}
      ></ImageForm>
    </Modal>
  )
}
