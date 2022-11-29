import { SimpleGrid, Image, createStyles, Title, Button } from '@mantine/core'
import { IconUpload } from '@tabler/icons'

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

export default function ImageGrid({ imagesURLs }) {
  const { classes } = useStyles()

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
        {imagesURLs.map((imageSrc: string, i: number) => (
          <Image mx="auto" radius="sm" key={i} width={200} src={imageSrc} />
        ))}
      </SimpleGrid>
      <Button
        className={classes.control}
        size="md"
        radius="xl"
        onClick={() => console.log('Control clicked')}
        leftIcon={<IconUpload />}
      >
        Upload
      </Button>
    </>
  )
}
