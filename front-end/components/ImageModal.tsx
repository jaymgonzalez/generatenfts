import { Image, Modal } from '@mantine/core'
import ImageForm from './ImageForm'
import { useSelector } from 'react-redux'
import { selectImagesUrls } from '../store/slices/imageSlice'

export default function ImageModal({ openedMap, setOpenedMap, index }) {
  const images = useSelector(selectImagesUrls)

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
      <Image py="lg" mx="auto" radius="sm" src={images[index]} />
      <ImageForm
        index={index}
        setOpenedMap={setOpenedMap}
        openedMap={openedMap}
      ></ImageForm>
    </Modal>
  )
}
