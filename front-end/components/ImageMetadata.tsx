import { Center } from '@mantine/core'
import { useAccount, useNetwork } from 'wagmi'
import { contractAddress } from '../constants'
import { useEffect, useRef } from 'react'
import ImageCarousel from './ImageCarousel'
import { returnCid } from '../utils/cid'

const date = new Date()

async function createImageFiles(images) {
  const files = await Promise.all(
    images.map(async (img) => {
      const response = await fetch(img.url)
      const arrayBuffer = await response.arrayBuffer()

      const blob = new Blob([arrayBuffer], { type: `image/${img.extension}` })

      return new File(
        [blob],
        img.nftName ? `${img.nftName}.${img.extension}` : img.name,
        { type: `image/${img.extension}` }
      )
    })
  )
  return files
}

async function getMetadata(images, metadata) {
  const files = await createImageFiles(images)
  const cid = await returnCid(files)
  return images.map((img) => {
    const attributes = img.attributes?.map((attr) => {
      if (attr.attribute.length === 0) return
      return {
        trait_type: attr.attribute,
        value: attr.value,
      }
    })

    const newMetadata = {
      id: img.id,
      cid,
      name: img.nftName || img.name,
      ...metadata,
      asset_url: img.nftName
        ? `ipfs://${cid}/${img.nftName.replace(/ /g, '_')}.${img.extension}`
        : 'PLEASE ADD A NAME TO YOUR NFT',
      timestamp: metadata.timestamp || Math.floor(date.getTime() / 1000),
    }

    if (img.author) newMetadata.author = img.author
    if (attributes && attributes[0]) newMetadata.attributes = attributes
    if (img.description) newMetadata.description = img.description
    return newMetadata
  })
}

export default function ImageMetadata({
  imagesURLs,
  setImagesURLs,
  imageData,
  openedMap,
  setOpenedMap,
  metadata,
  setMetadata,
}) {
  const { address } = useAccount()
  const { chain } = useNetwork()
  const refMetadata = useRef(metadata)

  const baseMetadata = {
    title: 'Generate NFT ', // choose by user (Name + Creator)
    contract: contractAddress, // contract that minted it
    owner: address, // wallet address
    timestamp: Math.floor(date.getTime() / 1000),
    network: chain.name,
  }

  useEffect(() => {
    refMetadata.current = metadata
  }, [metadata])

  useEffect(() => {
    const metadataArray = Promise.resolve(getMetadata(imageData, baseMetadata))
    metadataArray.then((res) => setMetadata(res))
  }, [refMetadata.current])

  return (
    <>
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
    </>
  )
}

// bafybeid6tazpnt2i4j3nznx25nt6d2e74cz22kqu2i4nnluyvndv65ekbq
