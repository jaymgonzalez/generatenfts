import { Button, Center, Image, Modal } from '@mantine/core'
import { IconX } from '@tabler/icons'
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
      <Image mx="auto" radius="sm" width={400} src={imageSrc} />
      <Center py="lg">
        <Button
          rightIcon={<IconX size={18} stroke={1.5} />}
          color="red"
          onClick={() => {
            const newImagesUrls = imagesURLs.slice()
            newImagesUrls.splice(index, 1)
            imageData.splice(index, 1)
            setImagesURLs(newImagesUrls)
            setOpenedMap({
              ...openedMap,
              [index]: false,
            })
          }}
        >
          Remove
        </Button>
      </Center>
      <ImageForm
        index={index}
        imagesURLs={imagesURLs}
        imageData={imageData}
        setOpenedMap={setOpenedMap}
        openedMap={openedMap}
      ></ImageForm>
    </Modal>
  )
}
