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

export default function ImageTable({
  imagesURLs,
  setImagesURLs,
  imageData,
  openedMap,
  setOpenedMap,
}) {
  const rows = imageData.map((img, index, arr) => {
    const attributes = img.attributes?.map(
      (attr) =>
        attr.attribute.length > 0 && (
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
          imageSrc={img.url}
        />
        <tr>
          <td>
            <Image
              sx={{ cursor: 'pointer' }}
              src={img.url}
              width={60}
              onClick={() =>
                setOpenedMap({
                  ...openedMap,
                  [index]: true,
                })
              }
            />
          </td>
          <td>{img.nftName || img.name}</td>
          <td>
            {img.author?.length === 42 && img.author.substring(0, 2) === '0x'
              ? `${img.author.slice(0, 4)}...${img.author.slice(
                  img.author.length - 4,
                  img.author.length
                )}`
              : img.author}
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
