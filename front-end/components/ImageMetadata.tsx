import { useAccount, useContractRead, useNetwork } from 'wagmi'
import { contractAddress, contractAbi } from '../constants'
import { useEffect, useRef, useState } from 'react'
import { returnCid } from '../utils/cid'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectImagesMetadata,
  setNftMetadata,
} from '../store/slices/imageSlice'

const date = new Date()

async function createImageFiles(images, tokenId) {
  const files = await Promise.all(
    images.map(async (img, i) => {
      const response = await fetch(img.url)
      const arrayBuffer = await response.arrayBuffer()

      const blob = new Blob([arrayBuffer], { type: `image/${img.extension}` })

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

    const newMetadata = {
      title: tokenId
        ? `Generate NFT Collection #${parseInt(tokenId) + 1 + i}`
        : 'Generate NFT Collection', // choose by user (Name + Creator)
      id: img.id,
      cid,
      tokenId: parseInt(tokenId) + 1 + i,
      name: img.nftName || parseInt(tokenId) + 1 + i,
      ...metadata,
      image: img.nftName
        ? `ipfs://${cid}/${img.nftName.trim().replace(/ /g, '_')}.${
            img.extension
          }`
        : `ipfs://${cid}/${parseInt(tokenId) + 1 + i}.${img.extension}`,
      timestamp: metadata.timestamp || Math.floor(date.getTime() / 1000),
    }

    if (img.author) newMetadata.author = img.author
    if (attributes && attributes[0]) newMetadata.attributes = attributes
    if (img.description) newMetadata.description = img.description
    return newMetadata
  })
}

export default function ImageMetadata({ images, setImages, children }) {
  const { address } = useAccount()
  const { chain } = useNetwork()
  const refMetadata = useRef(null)
  const [tokenId, setTokenId] = useState(null)

  const reduxImageMetadata = useSelector(selectImagesMetadata)

  const dispacth = useDispatch()

  const baseMetadata = {
    contract: contractAddress, // contract that minted it
    owner: address, // wallet address
    timestamp: Math.floor(date.getTime() / 1000),
    network: chain.name,
  }

  const {
    data: tokenIdData,
    isError,
    isLoading: tokenIsLoading,
    isSuccess: tokenIdSuccess,
  } = useContractRead({
    address: contractAddress,
    abi: contractAbi,
    functionName: '_tokenId',
  })

  useEffect(() => {
    setTokenId(tokenIdData.toString())
  }, [tokenIdData, tokenIdSuccess, tokenIsLoading])

  useEffect(() => {
    Promise.resolve(createImageFiles(reduxImageMetadata, tokenId)).then((res) =>
      setImages(res)
    )
  }, [images.length, tokenIdData])

  useEffect(() => {
    if (
      JSON.stringify(refMetadata.current) !== JSON.stringify(reduxImageMetadata)
    ) {
      refMetadata.current = reduxImageMetadata
    }
  }, [reduxImageMetadata])

  useEffect(() => {
    Promise.resolve(
      getMetadata(reduxImageMetadata, baseMetadata, tokenId)
    ).then((res) => dispacth(setNftMetadata(res)))
  }, [refMetadata.current, tokenIdData])

  return <>{children}</>
}
