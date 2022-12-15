import { Center } from '@mantine/core'
import makeStorageClient from '../web3storage'
import { pack } from 'ipfs-car/pack'
import { useAccount, useNetwork } from 'wagmi'
import { contractAddress } from '../constants'
import { useEffect, useRef } from 'react'
import ImageCarousel from './ImageCarousel'

function toImportCandidate(file) {
  let stream
  return {
    path: file.name,
    get content() {
      stream = stream || file.stream()
      return stream
    },
  }
}

async function getCid(_files) {
  try {
    const { root } = await pack({
      input: Array.from(_files).map(toImportCandidate),
    })
    return root.toString()
  } catch (err) {
    console.log(err)
  }
}

async function createFiles(images) {
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

async function storeFiles(files) {
  const client = makeStorageClient()
  const cid = await client.put(files)
  console.log('stored files with cid:', cid)
  return cid
}

async function returnCid(images) {
  const files = await createFiles(images)
  const cid = await getCid(files)
  console.log('files cid:', cid)
  return cid
}

function id() {
  return `0x${Math.random().toString(36).substring(2, 12)}`
}

async function getMetadata(images, metadata) {
  const cid = await returnCid(images)
  return images.map((img) => {
    const attributes = img.parameters?.map((attr) => {
      if (attr.parameter.length === 0) return
      return {
        trait_type: attr.parameter,
        value: attr.value,
      }
    })

    const newMetadata = {
      ...metadata,
      asset_url: `ipfs://${cid}/${img.nftName.replace(/ /g, '_')}.${
        img.extension
      }`,
      name: img.nftName || img.name,
      id: id(),
      author: img.author,
    }

    if (attributes && attributes[0]) newMetadata.attributes = attributes
    if (img.description) newMetadata.description = img.description
    return newMetadata
  })
}

export default function UploadToIpfs({
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
  const date = new Date()
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
