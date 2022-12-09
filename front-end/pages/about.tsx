import { Stepper, Group, Button, Center, Text } from '@mantine/core'
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import { useState } from 'react'
import Upload from '../components/Upload'
import ImageGrid from '../components/ImageGrid'
import UploadToIpfs from '../components/UploadToIpfs'
import ImageTable from '../components/ImageTable'

// import AuthenticatedPage from '../components/Authenticated'

// import {
//   useConnectModal,
//   useAccountModal,
//   useChainModal,
// } from '@rainbow-me/rainbowkit'
// import NetworkButton from '../components/NetworkButton'
type Parameter = {
  parameter: string
  value: string
}
export type ImageData = {
  name: string
  extension: string
  url: string
  nftName?: string
  creatorName?: string
  parameters?: Parameter[]
}

export default function About() {
  const [active, setActive] = useState(0)
  const [imagesURLs, setImagesURLs] = useState([])
  const [imageData, setImageData] = useState<ImageData[]>([])
  const [openedMap, setOpenedMap] = useState({})

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current))
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current))
  // const { address } = useAccount()

  // const { chain } = useNetwork()
  // const { chains, error, isLoading, pendingChainId, switchNetwork } =
  //   useSwitchNetwork()

  return (
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
        <Stepper.Step label="Second step" description="Confirm information">
          <ImageTable
            imagesURLs={imagesURLs}
            setImagesURLs={setImagesURLs}
            imageData={imageData}
            openedMap={openedMap}
            setOpenedMap={setOpenedMap}
          />
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Get full access">
          Step 3 content: Get full access
          <UploadToIpfs imagesURLs={imagesURLs} imageData={imageData} />
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>

      <Group position="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep}>Next step</Button>
      </Group>
    </>
  )
}
