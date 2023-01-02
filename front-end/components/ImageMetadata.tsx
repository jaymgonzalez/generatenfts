import { Center } from '@mantine/core'
import { useAccount, useContractRead, useNetwork } from 'wagmi'
import { contractAddress, contractAbi } from '../constants'
import { useEffect, useRef, useState } from 'react'
import ImageCarousel from './ImageCarousel'
import { returnCid } from '../utils/cid'

const date = new Date()

async function createImageFiles(images, tokenId) {
  const files = await Promise.all(
    images.map(async (img, i) => {
      const response = await fetch(img.url)
      const arrayBuffer = await response.arrayBuffer()

      const blob = new Blob([arrayBuffer], { type: `image/${img.extension}` })

      console.log(
        img.nftName
          ? `${img.nftName.replace(/ /g, '_')}.${img.extension}`
          : `${parseInt(tokenId) + 1 + i}.${img.extension}`
      )

      return new File(
        [blob],
        img.nftName
          ? `${img.nftName.replace(/ /g, '_')}.${img.extension}`
          : `${parseInt(tokenId) + 1 + i}.${img.extension}`,
        { type: `image/${img.extension}` }
      )
    })
  )
  return files
}

async function getMetadata(images, metadata, tokenId) {
  const files = await createImageFiles(images, tokenId)
  const cid = await returnCid(files)
  return images.map((img, i) => {
    const attributes = img.attributes?.map((attr) => {
      if (attr.attribute.length === 0) return
      return {
        trait_type: attr.attribute,
        value: attr.value,
      }
    })

    console.log(tokenId)
    console.log(`img nft: ${img.nftName}`)

    const newMetadata = {
      title: tokenId
        ? `Generate NFT Collection #${parseInt(tokenId) + 1 + i}`
        : 'Generate NFT Collection', // choose by user (Name + Creator)
      id: img.id,
      cid,
      name: img.nftName || parseInt(tokenId) + 1 + i,
      ...metadata,
      image: img.nftName
        ? `ipfs://${cid}/${img.nftName.trim().replace(/ /g, '_')}.${
            img.extension
          }`
        : `ipfs://${cid}/${parseInt(tokenId) + 1 + i}.${img.extension}`,
      timestamp: metadata.timestamp || Math.floor(date.getTime() / 1000),
    }

    console.log(newMetadata)

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
  images,
  setImages,
}) {
  const { address } = useAccount()
  const { chain } = useNetwork()
  const refMetadata = useRef(metadata)
  const [tokenId, setTokenId] = useState(null)

  const baseMetadata = {
    contract: contractAddress, // contract that minted it
    owner: address, // wallet address
    timestamp: Math.floor(date.getTime() / 1000),
    network: chain.name,
  }

  const {
    data: tokenIdData,
    isError,
    isLoading,
    isSuccess: tokenIdSuccess,
  } = useContractRead({
    address: contractAddress,
    abi: contractAbi,
    functionName: '_tokenId',
  })

  useEffect(() => {
    setTokenId(tokenIdData.toString())
  }, [tokenIdData, tokenIdSuccess])

  useEffect(() => {
    Promise.resolve(createImageFiles(imageData, tokenId)).then((res) =>
      setImages(res)
    )
  }, [images.length])

  useEffect(() => {
    refMetadata.current = metadata
  }, [metadata])

  useEffect(() => {
    Promise.resolve(getMetadata(imageData, baseMetadata, tokenId)).then((res) =>
      setMetadata(res)
    )
  }, [refMetadata.current, tokenIdSuccess])

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

// https://bafybeid55flk2mxmkjkbvrklpbckdhmws66dng4oldgf5lpsfbpydiepkq.ipfs.w3s.link/44.png
