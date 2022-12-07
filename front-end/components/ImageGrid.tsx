import {
  SimpleGrid,
  Image,
  createStyles,
  Title,
  Modal,
  Button,
  Center,
} from '@mantine/core'
import { IconUpload, IconX } from '@tabler/icons'
import { useState } from 'react'

const useStyles = createStyles(() => ({
  container: {
    margin: 50,
  },
  title: {
    marginTop: 50,
    textAlign: 'center',
  },
  control: {
    position: 'absolute',
    width: 250,
    left: 'calc(50% - 125px)',
    marginBottom: 50,
  },
}))

export default function ImageGrid({ imagesURLs, setImagesURLs }) {
  const { classes } = useStyles()
  const [openedMap, setOpenedMap] = useState({})

  return (
    <>
      {imagesURLs.length > 0 && (
        <Title className={classes.title} order={2}>
          Images
        </Title>
      )}
      <SimpleGrid
        className={classes.container}
        cols={imagesURLs.length <= 4 ? imagesURLs.length : 4}
        spacing="lg"
        breakpoints={[
          { maxWidth: 'md', cols: 3, spacing: 'md' },
          { maxWidth: 'sm', cols: 2, spacing: 'sm' },
          { maxWidth: 'xs', cols: 1, spacing: 'sm' },
        ]}
      >
        {imagesURLs.map((imageSrc: string, i: number) => {
          return (
            <>
              <Image
                mx="auto"
                radius="sm"
                key={i}
                width={200}
                src={imageSrc}
                onClick={() =>
                  setOpenedMap({
                    ...openedMap,
                    [i]: true,
                  })
                }
              />
              <Modal
                opened={openedMap[i] || false}
                onClose={() => {
                  setOpenedMap({
                    ...openedMap,
                    [i]: false,
                  })
                }}
              >
                <Image
                  mx="auto"
                  radius="sm"
                  key={i}
                  width={400}
                  src={imageSrc}
                />
                <Center py="lg">
                  <Button
                    rightIcon={<IconX size={18} stroke={1.5} />}
                    color="red"
                    onClick={() => {
                      const newImagesUrls = imagesURLs.slice()
                      newImagesUrls.splice(i, 1)
                      setImagesURLs(newImagesUrls)
                      setOpenedMap({
                        ...openedMap,
                        [i]: false,
                      })
                    }}
                  >
                    Remove
                  </Button>
                </Center>
              </Modal>
            </>
          )
        })}
      </SimpleGrid>
    </>
  )
}
