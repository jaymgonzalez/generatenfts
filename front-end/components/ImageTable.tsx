import {
  createStyles,
  Table,
  Progress,
  Anchor,
  Text,
  Group,
  ScrollArea,
  Image,
  ActionIcon,
} from '@mantine/core'
import { IconPencil, IconTrash, IconX } from '@tabler/icons'

export default function ImageTable({ imageData }) {
  console.log(imageData)

  const rows = imageData.map((img) => {
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
        <tr key={img.url}>
          <td>
            <Image src={img.url} width={60} />
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
              <ActionIcon>
                <IconPencil size={16} stroke={1.5} />
              </ActionIcon>
              <ActionIcon color="red">
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
