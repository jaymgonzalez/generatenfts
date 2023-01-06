import { useRef, useState, useEffect } from 'react'
import { Text, Group, Button, createStyles } from '@mantine/core'
import { Dropzone, FileWithPath, MIME_TYPES } from '@mantine/dropzone'
import { IconCloudUpload, IconX, IconDownload } from '@tabler/icons'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectImagesUrls,
  setImageUrls,
  setNftMetadata,
} from '../store/slices/imageSlice'

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    marginBottom: 30,
    paddingLeft: 50,
    paddingRight: 50,
  },

  dropzone: {
    borderWidth: 1,
    paddingBottom: 50,
  },

  icon: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },

  control: {
    position: 'absolute',
    width: 250,
    left: 'calc(50% - 125px)',
    bottom: -20,
  },
}))

function genId() {
  return `0x${Math.random().toString(36).substring(2, 12)}`
}

export default function Upload() {
  const { classes, theme } = useStyles()
  const openRef = useRef<() => void>(null)
  const [images, setImages] = useState<FileWithPath[]>([])
  const dispatch = useDispatch()

  const reduxImageUrls = useSelector(selectImagesUrls)

  useEffect(() => {
    if (images.length < 1) return
    const newImageURLs = reduxImageUrls.concat(
      images.map((image) => {
        const { name } = image
        const url = URL.createObjectURL(image)
        const extension = name.split('.')[name.split('.').length - 1]
        const id = genId()
        dispatch(setNftMetadata({ name, extension, url, id }))
        return url
      })
    )
    dispatch(setImageUrls(newImageURLs))
  }, [images])

  function onImageDrop(files: any) {
    setImages([...files])
  }

  return (
    <div className={classes.wrapper}>
      <Dropzone
        openRef={openRef}
        onDrop={onImageDrop}
        className={classes.dropzone}
        radius="md"
        accept={[MIME_TYPES.png, MIME_TYPES.jpeg]}
        maxSize={3 * 1024 ** 2}
      >
        <div style={{ pointerEvents: 'none' }}>
          <Group position="center">
            <Dropzone.Accept>
              <IconDownload
                size={50}
                color={theme.colors[theme.primaryColor][6]}
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX size={50} color={theme.colors.red[6]} stroke={1.5} />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconCloudUpload
                size={50}
                color={
                  theme.colorScheme === 'dark'
                    ? theme.colors.dark[0]
                    : theme.black
                }
                stroke={1.5}
              />
            </Dropzone.Idle>
          </Group>

          <Text align="center" weight={700} size="lg" mt="xl">
            <Dropzone.Accept>Drop files here</Dropzone.Accept>
            <Dropzone.Reject>
              JPEG and PNG files only. Not bigger than 3mb
            </Dropzone.Reject>
            <Dropzone.Idle>Upload your images</Dropzone.Idle>
          </Text>
          <Text align="center" size="sm" mt="xs" color="dimmed">
            Drag&apos;n&apos;drop files here to upload. We can accept only{' '}
            <i>.png</i> or <i>.jpeg</i> files that are less than 3mb in size.
          </Text>
        </div>
      </Dropzone>

      <Button
        className={classes.control}
        size="md"
        radius="xl"
        onClick={() => openRef.current?.()}
      >
        Select files
      </Button>
    </div>
  )
}
