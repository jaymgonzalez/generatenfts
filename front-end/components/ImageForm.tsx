import { useForm } from '@mantine/form'
import { useDispatch, useSelector } from 'react-redux'
import {
  setImageUrls,
  selectImagesUrls,
  setImageMetadata,
  selectImagesMetadata,
} from '../store/slices/imageSlice'
import {
  TextInput,
  Button,
  Group,
  Box,
  Divider,
  Tooltip,
  Flex,
  UnstyledButton,
  Textarea,
} from '@mantine/core'
import { IconCircleMinus, IconCirclePlus, IconTrash } from '@tabler/icons'
import { useAccount } from 'wagmi'

export default function ImageForm({ index, setOpenedMap, openedMap }) {
  const { address } = useAccount()
  const dispatch = useDispatch()

  const reduxImageUrls = useSelector(selectImagesUrls)
  const reduxImagesMetadata = useSelector(selectImagesMetadata)

  // const initialValues = reduxImageUrls.map((img) =>
  //   reduxImagesMetadata.find((data) => data.url === img)
  // )

  // console.log('redux', reduxImagesMetadata)

  const form = useForm({
    initialValues: {
      nftName:
        reduxImagesMetadata[index].nftName || reduxImagesMetadata[index].name, // TODO: add owner here
      author: reduxImagesMetadata[index].author || address,
      attributes: reduxImagesMetadata[index].attributes || [
        { attribute: '', value: '' },
      ],
      description: reduxImagesMetadata[index].description || '',
    },
  })

  const fields = form.values.attributes.map((_, _index) => (
    <Box key={_index + 2343}>
      <Flex mt="xs" gap="sm" justify="center" align="center">
        <TextInput
          label="Attribute"
          placeholder="Attribute"
          display="inline-block"
          {...form.getInputProps(`attributes.${_index}.attribute`)}
        />
        <TextInput
          label="Value"
          placeholder="Value"
          display="inline-block"
          {...form.getInputProps(`attributes.${_index}.value`)}
        />
        <Tooltip label="Remove">
          <UnstyledButton
            mt={32}
            onClick={() => form.removeListItem('attributes', _index)}
          >
            <IconCircleMinus />
          </UnstyledButton>
        </Tooltip>
      </Flex>
    </Box>
  ))

  return (
    <Box sx={{ maxWidth: 500 }} mx="auto">
      <form
        onSubmit={form.onSubmit((values) => {
          const { nftName, author, attributes, description } = values

          reduxImagesMetadata[index] = {
            ...reduxImagesMetadata[index],
            nftName,
            author,
            attributes,
            description,
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
          label="Author"
          placeholder="Creator's name"
          {...form.getInputProps('author')}
        />
        <Textarea
          placeholder="Description"
          label="Description"
          {...form.getInputProps('description')}
        />
        <Tooltip
          label="Click on the + sign to add your own attributes"
          position="bottom-end"
          offset={-5.5}
        >
          <Divider
            mt="md"
            labelPosition="right"
            label={
              <>
                <Box mr={8}>Attributes</Box>
                <Box sx={{ cursor: 'pointer', marginRight: 3 }}>
                  <IconCirclePlus
                    size={26}
                    onClick={() =>
                      form.insertListItem('attributes', {
                        attribute: '',
                        value: '',
                      })
                    }
                  />
                </Box>
              </>
            }
          />
        </Tooltip>

        {fields}
        <Group position="center" mt="xl">
          <Button type="submit">Submit</Button>
          <Button
            leftIcon={<IconTrash />}
            variant="light"
            color="red"
            onClick={() => {
              const newImagesUrls = reduxImageUrls.slice()
              newImagesUrls.splice(index, 1)

              const newImageMetadata = reduxImagesMetadata.slice()
              newImageMetadata.splice(index, 1)

              // setImagesURLs(newImagesUrls)
              dispatch(setImageUrls(newImagesUrls))
              dispatch(setImageMetadata(newImageMetadata))
              setOpenedMap({
                ...openedMap,
                [index]: false,
              })
            }}
          >
            Remove
          </Button>
        </Group>
      </form>
    </Box>
  )
}
