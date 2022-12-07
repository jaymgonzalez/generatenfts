import { useForm } from '@mantine/form'
import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core'

export default function ImageForm({
  imagesURLs,
  imageData,
  index,
  setOpenedMap,
  openedMap,
}) {
  const initialValues = imagesURLs.map((img) =>
    imageData.find((data) => data.url === img)
  )

  const form = useForm({
    initialValues: {
      nftName: initialValues[index].nftName || initialValues[index].name,
      creatorName: initialValues[index].creatorName || '',
    },
  })

  // console.log(imageData[index])
  console.log(imageData)

  return (
    <>
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form
          onSubmit={form.onSubmit((values) => {
            const { nftName, creatorName } = values
            imageData[index].nftName = nftName
            imageData[index].creatorName = creatorName
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
            withAsterisk
            label="Creator"
            placeholder="Creator's name"
            {...form.getInputProps('creatorName')}
          />

          <Checkbox
            mt="md"
            label="I agree to sell my privacy"
            {...form.getInputProps('termsOfService', { type: 'checkbox' })}
          />
          <Group position="center" mt="md">
            <Button type="submit">Submit Info</Button>
          </Group>
        </form>
      </Box>
    </>
  )
}
