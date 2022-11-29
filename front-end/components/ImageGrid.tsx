import { Grid, Image } from '@mantine/core'

export default function ImageGrid({ imagesURLs }) {
  return (
    <Grid>
      {imagesURLs.map((imageSrc: string) => (
        <Grid.Col md={6} lg={3} span={4}>
          <Image width={200} fit="contain" src={imageSrc} />
        </Grid.Col>
      ))}
    </Grid>
  )
}
