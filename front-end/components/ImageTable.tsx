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
  const rows = imageData.map((img, index) => {
    const parameters = img.parameters?.map(
      (param) =>
        param.parameter.length > 0 && (
          <Text>
            {param.parameter}: {param.value}
          </Text>
        )
    )

    return (
      <>
        <ImageModal
          index={index}
          imagesURLs={imagesURLs}
          setImagesURLs={setImagesURLs}
          imageData={imageData}
          setOpenedMap={setOpenedMap}
          openedMap={openedMap}
          imageSrc={img.url}
        />
        <tr key={img.url}>
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
            {img.creatorName?.length === 42 &&
            img.creatorName.substring(0, 2) === '0x'
              ? `${img.creatorName.slice(0, 4)}...${img.creatorName.slice(
                  img.creatorName.length - 4,
                  img.creatorName.length
                )}`
              : img.creatorName}
          </td>
          <td>{parameters}</td>
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
      </>
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
              <th>Creator</th>
              <th>Parameters</th>
              <th />
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </>
  )
}
