import { useForm } from '@mantine/form'
import {
  TextInput,
  Button,
  Group,
  Box,
  Divider,
  Tooltip,
  Flex,
  UnstyledButton,
} from '@mantine/core'
import { IconCircleMinus, IconInfoCircle } from '@tabler/icons'
import { useAccount } from 'wagmi'

export default function ImageForm({
  imagesURLs,
  imageData,
  index,
  setOpenedMap,
  openedMap,
}) {
  const { address } = useAccount()

  const smallAddress =
    address !== undefined
      ? `${address.slice(0, 4)}...${address.slice(
          address.length - 4,
          address.length
        )}`
      : ''

  const initialValues = imagesURLs.map((img) =>
    imageData.find((data) => data.url === img)
  )

  const form = useForm({
    initialValues: {
      nftName: initialValues[index].nftName || initialValues[index].name,
      creatorName: initialValues[index].creatorName || address,
      parameters: initialValues[index].parameters || [
        { parameter: '', value: '' },
      ],
    },
  })

  const fields = form.values.parameters.map((_, _index) => (
    <Flex mt="xs" gap="sm" justify="center" align="center">
      <TextInput
        label="Parameter"
        placeholder="Parameter"
        display="inline-block"
        {...form.getInputProps(`parameters.${_index}.parameter`)}
      />
      <TextInput
        label="Value"
        placeholder="Value"
        display="inline-block"
        {...form.getInputProps(`parameters.${_index}.value`)}
      />
      <Tooltip label="Remove">
        <UnstyledButton
          mt={32}
          onClick={() => form.removeListItem('parameters', _index)}
        >
          <IconCircleMinus />
        </UnstyledButton>
      </Tooltip>
    </Flex>
  ))

  return (
    <>
      <Box sx={{ maxWidth: 450 }} mx="auto">
        <form
          onSubmit={form.onSubmit((values) => {
            const { nftName, creatorName, parameters } = values

            imageData[index] = {
              ...imageData[index],
              nftName,
              creatorName,
              parameters,
            }
            setOpenedMap({
              ...openedMap,
              [index]: false,
            })
          })}
        >
          <TextInput
            placeholder="NFT name"
            label="NFT name"
            radius="md"
            withAsterisk
            {...form.getInputProps('nftName')}
          />
          <TextInput
            label="Creator"
            placeholder="Creator's name"
            {...form.getInputProps('creatorName')}
          />
          <Tooltip label="Add your own parameters" position="bottom-start">
            <Divider
              my="md"
              label={
                <>
                  <Box mr={5}>Parameters</Box>
                  <IconInfoCircle size={18} />
                </>
              }
            />
          </Tooltip>
          {fields}
          <Group position="center" mt="md">
            <Button type="submit">Submit Info</Button>
            <Button
              variant="outline"
              onClick={() =>
                form.insertListItem('parameters', { parameter: '', value: '' })
              }
            >
              Add Custom Parameter
            </Button>
          </Group>
        </form>
      </Box>
    </>
  )
}
