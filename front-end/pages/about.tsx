import { Stepper, Group, Button, Center, Text, Box } from '@mantine/core'
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import { useState } from 'react'
import Upload from '../components/Upload'
import ImageGrid from '../components/ImageGrid'
import ImageMetadata from '../components/ImageMetadata'
import ImageTable from '../components/ImageTable'
import AuthenticatedPage from '../components/Authenticated'
import RunContract from '../components/RunContract'

type Attribute = {
  attribute: string
  value: string
}
export type ImageData = {
  name: string
  extension: string
  url: string
  nftName?: string
  author?: string
  attributes?: Attribute[]
}

export default function About() {
  const [active, setActive] = useState(0)
  const [imagesURLs, setImagesURLs] = useState([])
  const [imageData, setImageData] = useState<ImageData[]>([])
  const [openedMap, setOpenedMap] = useState({})
  const [metadata, setMetadata] = useState([])
  const { address } = useAccount()

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current))
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current))

  return (
    <>
      <AuthenticatedPage address={address}>
        <Stepper active={active} onStepClick={setActive} breakpoint="sm">
          <Stepper.Step label="First step" description="Add images">
            <Upload
              imagesURLs={imagesURLs}
              setImagesURLs={setImagesURLs}
              imageData={imageData}
              setImageData={setImageData}
            />
            <ImageGrid
              imagesURLs={imagesURLs}
              setImagesURLs={setImagesURLs}
              imageData={imageData}
              openedMap={openedMap}
              setOpenedMap={setOpenedMap}
            />
          </Stepper.Step>
          <Stepper.Step label="Second step" description="Confirm information">
            <ImageTable
              imagesURLs={imagesURLs}
              setImagesURLs={setImagesURLs}
              imageData={imageData}
              openedMap={openedMap}
              setOpenedMap={setOpenedMap}
            />
          </Stepper.Step>
          <Stepper.Step label="Final step" description="Generate your NFTs">
            <ImageMetadata
              imagesURLs={imagesURLs}
              setImagesURLs={setImagesURLs}
              imageData={imageData}
              openedMap={openedMap}
              setOpenedMap={setOpenedMap}
              metadata={metadata}
              setMetadata={setMetadata}
            />
          </Stepper.Step>
          <Stepper.Completed>
            <>
              <RunContract />
            </>
          </Stepper.Completed>
        </Stepper>

        <Group position="center" mt="xl">
          {active < 3 && (
            <Button variant="default" onClick={prevStep}>
              Back
            </Button>
          )}
          {active !== 3 && (
            <Button onClick={nextStep}>
              {active === 2 ? 'Generate NFTs' : 'Next step'}
            </Button>
          )}
        </Group>
      </AuthenticatedPage>
    </>
  )
}
