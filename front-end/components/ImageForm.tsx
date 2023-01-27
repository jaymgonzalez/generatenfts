import { useForm, hasLength, isNotEmpty, isInRange } from '@mantine/form'
import { useDispatch, useSelector } from 'react-redux'
import {
  setImageUrls,
  selectImagesUrls,
  setImageMetadata,
  selectImagesMetadata,
  setNftMetadata,
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
  ActionIcon,
} from '@mantine/core'
import { IconCircleMinus, IconCirclePlus, IconTrash } from '@tabler/icons'

export default function ImageForm({ index, setOpenedMap, openedMap }) {
  const dispatch = useDispatch()

  const reduxImageUrls = useSelector(selectImagesUrls)
  const reduxImagesMetadata = useSelector(selectImagesMetadata)

  const form = useForm({
    initialValues: {
      name: reduxImagesMetadata[index].name || '',
      author: reduxImagesMetadata[index].author || '',
      attributes: reduxImagesMetadata[index].attributes || [
        { trait_type: '', value: '' },
      ],
      description: reduxImagesMetadata[index].description || '',
    },

    validate: {
      name: (value) =>
        value.length > 20
          ? 'Please add a name no longer than 20 characters'
          : value === ''
          ? 'Please add a name'
          : null,
      author: (value) =>
        value?.length < 20
          ? null
          : 'Please add an author no longer than 20 characters',
      attributes: {
        trait_type: (value) =>
          value.length < 1 ? 'Please add a trait type' : null,
        value: (value) => (value.length < 1 ? 'Please add a value' : null),
      },
      description: hasLength(
        { max: 120 },
        'Description must have 120 characters max'
      ),
    },
  })

  const fields = form.values.attributes.map((_, _index) => (
    <Box key={_index + 2343}>
      <Flex mt="xs" gap="sm" justify="center" align="center">
        <TextInput
          label="Attribute"
          placeholder="Attribute"
          display="inline-block"
          {...form.getInputProps(`attributes.${_index}.trait_type`)}
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
          const { name, author, attributes, description } = values

          const updatedMetadata = {
            ...reduxImagesMetadata[index],
            name,
            author,
            attributes,
            description,
          }
          // console.log(dispatch(setNftMetadata(updatedMetadata)))
          dispatch(setNftMetadata(updatedMetadata))
          setOpenedMap({
            ...openedMap,
            [index]: false,
          })
        })}
      >
        <TextInput
          placeholder="Add NFT name"
          label="NFT name"
          radius="md"
          withAsterisk
          {...form.getInputProps('name')}
        />
        <TextInput
          label="Author"
          placeholder="Add creator's name"
          {...form.getInputProps('author')}
        />
        <Textarea
          placeholder="Description"
          label="Description"
          {...form.getInputProps('description')}
        />
        {form.values.attributes.length <= 7 ? (
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
                    <ActionIcon variant="transparent">
                      {' '}
                      <IconCirclePlus
                        size={26}
                        color="#AEAFB1"
                        onClick={() =>
                          form.insertListItem('attributes', {
                            trait_type: '',
                            value: '',
                          })
                        }
                      />
                    </ActionIcon>
                  </Box>
                </>
              }
            />
          </Tooltip>
        ) : (
          <Tooltip
            label="No more than 8 attributes allowed"
            position="bottom-end"
            offset={-5.5}
          >
            <Divider
              mt="md"
              labelPosition="right"
              label={
                <>
                  <Box mr={8}>Attributes</Box>
                  <Box sx={{ cursor: 'not-allowed', marginRight: 3 }}>
                    <ActionIcon variant="transparent" disabled>
                      {' '}
                      <IconCirclePlus size={26} color="#ff6b6b" />
                    </ActionIcon>
                  </Box>
                </>
              }
            />
          </Tooltip>
        )}

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
