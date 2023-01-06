import {
  Table,
  Text,
  Group,
  ScrollArea,
  Image,
  ActionIcon,
} from '@mantine/core'
import { IconPencil, IconTrash } from '@tabler/icons'
import ImageModal from './ImageModal'
import { useDispatch, useSelector } from 'react-redux'
import {
  setImageUrls,
  selectImagesUrls,
  setImageMetadata,
  selectImagesMetadata,
} from '../store/slices/imageSlice'

export default function ImageTable({ openedMap, setOpenedMap }) {
  const dispatch = useDispatch()
  const reduxImagesMetadata = useSelector(selectImagesMetadata)
  const reduxImagesUrls = useSelector(selectImagesUrls)

  const rows = reduxImagesMetadata.map((img, index, arr) => {
    const attributes = img.attributes?.map(
      (attr) =>
        attr.attribute?.length > 0 && (
          <Text key={arr[index].url + attr.attribute}>
            {attr.attribute}: {attr.value}
          </Text>
        )
    )

    return (
      <tbody key={img.url}>
        <ImageModal
          index={index}
          setOpenedMap={setOpenedMap}
          openedMap={openedMap}
        />
        <tr>
          <td>
            <Image
              sx={{ cursor: 'pointer' }}
              src={reduxImagesUrls[index]}
              width={60}
              onClick={() =>
                setOpenedMap({
                  ...openedMap,
                  [index]: true,
                })
              }
            />
          </td>
          <td>{img.name}</td>
          <td>
            {img.author
              ? img.author
              : `${img.owner.slice(0, 4)}...${img.owner.slice(
                  img.owner.length - 4,
                  img.owner.length
                )}`}
          </td>
          <td>{attributes}</td>
          <td>
            <Group spacing={0} position="right">
              <ActionIcon
                onClick={() =>
                  setOpenedMap({
                    ...openedMap,
                    [index]: true,
                  })
                }
              >
                <IconPencil size={16} stroke={1.5} />
              </ActionIcon>
              <ActionIcon
                color="red"
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
              >
                <IconTrash size={16} stroke={1.5} />
              </ActionIcon>
            </Group>
          </td>
        </tr>
      </tbody>
    )
  })

  return (
    <>
      <ScrollArea>
        <Table sx={{ minWidth: 800 }} verticalSpacing="xs">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Author/Owner</th>
              <th>Attributes</th>
              <th />
            </tr>
          </thead>
          {rows}
        </Table>
      </ScrollArea>
    </>
  )
}
