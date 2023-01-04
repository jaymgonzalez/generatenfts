import {
  Stepper,
  Group,
  Button,
  Center,
  Text,
  Box,
  Notification,
} from '@mantine/core'
import { useAccount, useNetwork } from 'wagmi'
import { useEffect, useState } from 'react'
import Upload from '../components/Upload'
import ImageGrid from '../components/ImageGrid'
import ImageMetadata from '../components/ImageMetadata'
import ImageTable from '../components/ImageTable'
import AuthenticatedPage from '../components/Authenticated'
import RunContract from '../components/RunContract'
import ImageCarousel from '../components/ImageCarousel'
import { IconCheck, IconX } from '@tabler/icons'

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
  const [images, setImages] = useState([])
  const { address } = useAccount()

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current))
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current))

  useEffect(() => {
    if (imagesURLs.length === 0) setActive(0)
  }, [imagesURLs.length, active])

  return (
    <>
      <AuthenticatedPage address={address}>
        <RunContract address={address} metadata={metadata} images={images}>
          {(mintData, mintWrite, mintIsLoading, mintIsSuccess, mintIsError) => (
            <>
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
                <Stepper.Step
                  label="Second step"
                  description="Confirm information"
                  allowStepSelect={imagesURLs.length > 0}
                >
                  <ImageMetadata
                    imageData={imageData}
                    metadata={metadata}
                    setMetadata={setMetadata}
                    images={images}
                    setImages={setImages}
                  >
                    <Center mt={24}>
                      <ImageCarousel
                        imagesURLs={imagesURLs}
                        setImagesURLs={setImagesURLs}
                        imageData={imageData}
                        openedMap={openedMap}
                        setOpenedMap={setOpenedMap}
                        metadata={metadata}
                        setMetadata={setMetadata}
                      />
                    </Center>
                  </ImageMetadata>
                </Stepper.Step>
                <Stepper.Step
                  label="Final step"
                  description="Generate your NFTs"
                  allowStepSelect={imagesURLs.length > 0}
                >
                  <ImageMetadata
                    imageData={imageData}
                    metadata={metadata}
                    setMetadata={setMetadata}
                    images={images}
                    setImages={setImages}
                  >
                    <ImageTable
                      imagesURLs={imagesURLs}
                      setImagesURLs={setImagesURLs}
                      imageData={imageData}
                      openedMap={openedMap}
                      setOpenedMap={setOpenedMap}
                    />
                  </ImageMetadata>
                </Stepper.Step>
                <Stepper.Completed>
                  <Center>
                    {mintIsLoading && (
                      <Notification
                        loading
                        title="Generating NFT"
                        disallowClose
                      >
                        Please accept the transaction in your wallet
                      </Notification>
                    )}
                    {mintIsSuccess && (
                      <Notification
                        icon={<IconCheck size={20} />}
                        color="teal"
                        title="Success"
                        disallowClose
                        sx={(theme) => ({
                          a: {
                            textDecoration: 'none',
                            color:
                              theme.colorScheme === 'dark'
                                ? theme.colors.blue[4]
                                : theme.colors.gray[3],
                            '&:hover': {
                              color: theme.colors.blue[7],
                            },
                          },
                        })}
                      >
                        Transaction successful! Check it{' '}
                        <a
                          target="_blank"
                          href={`https://mumbai.polygonscan.com/tx/${mintData.hash}`}
                        >
                          here
                        </a>
                      </Notification>
                    )}
                    {mintIsError && (
                      <Notification
                        icon={<IconX size={20} />}
                        color="red"
                        title="Error"
                        disallowClose
                      >
                        There has been an error in the transaction, please try
                        again!
                      </Notification>
                    )}
                  </Center>
                </Stepper.Completed>
              </Stepper>

              <Group position="center" mt="xl">
                {0 < active && active < 3 && (
                  <Button variant="default" onClick={prevStep}>
                    Back
                  </Button>
                )}
                {active === 3 && mintIsError && (
                  <Button variant="default" onClick={prevStep}>
                    Back
                  </Button>
                )}
                {imagesURLs.length > 0 && active < 2 && (
                  <Button onClick={nextStep}>Next step</Button>
                )}
                {active === 2 && (
                  <Button
                    disabled={!mintWrite}
                    onClick={() => {
                      mintWrite?.()
                      nextStep()
                    }}
                  >
                    Generate NFTs
                  </Button>
                )}
              </Group>
            </>
          )}
        </RunContract>
      </AuthenticatedPage>
    </>
  )
}
