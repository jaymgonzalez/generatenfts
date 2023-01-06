import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectImagesUrls } from '../store/slices/imageSlice'
import { Stepper, Group, Button, Center } from '@mantine/core'
import { useAccount, useNetwork } from 'wagmi'

import Upload from '../components/Upload'
import ImageGrid from '../components/ImageGrid'
import ImageMetadata from '../components/ImageMetadata'
import ImageTable from '../components/ImageTable'
import AuthenticatedPage from '../components/Authenticated'
import RunContract from '../components/RunContract'
import ImageCarousel from '../components/ImageCarousel'
import CompletedStep from '../components/CompletedStep'

export default function GenerateNft() {
  const [active, setActive] = useState(0)
  const [openedMap, setOpenedMap] = useState({})
  const [metadata, setMetadata] = useState([])
  const [images, setImages] = useState([])
  const { address } = useAccount()

  const reduxImageUrls = useSelector(selectImagesUrls)

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current))
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current))

  useEffect(() => {
    if (reduxImageUrls.length === 0) setActive(0)
  }, [reduxImageUrls.length, active])

  return (
    <>
      <AuthenticatedPage address={address}>
        <RunContract address={address} metadata={metadata} images={images}>
          {(mintData, mintWrite, mintIsLoading, mintIsSuccess, mintIsError) => (
            <>
              <Stepper active={active} onStepClick={setActive} breakpoint="sm">
                <Stepper.Step label="First step" description="Add images">
                  <Upload />
                  <ImageGrid
                    openedMap={openedMap}
                    setOpenedMap={setOpenedMap}
                  />
                </Stepper.Step>
                <Stepper.Step
                  label="Second step"
                  description="Confirm information"
                  allowStepSelect={reduxImageUrls.length > 0}
                >
                  <ImageMetadata images={images} setImages={setImages}>
                    <Center mt={24}>
                      <ImageCarousel
                        openedMap={openedMap}
                        setOpenedMap={setOpenedMap}
                      />
                    </Center>
                  </ImageMetadata>
                </Stepper.Step>
                <Stepper.Step
                  label="Final step"
                  description="Generate your NFTs"
                  allowStepSelect={reduxImageUrls.length > 0}
                >
                  <ImageMetadata images={images} setImages={setImages}>
                    <ImageTable
                      openedMap={openedMap}
                      setOpenedMap={setOpenedMap}
                    />
                  </ImageMetadata>
                </Stepper.Step>
                <Stepper.Completed>
                  <CompletedStep
                    mintData={mintData}
                    mintIsError={mintIsError}
                    mintIsLoading={mintIsLoading}
                    mintIsSuccess={mintIsSuccess}
                  />
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
                {reduxImageUrls.length > 0 && active < 2 && (
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
