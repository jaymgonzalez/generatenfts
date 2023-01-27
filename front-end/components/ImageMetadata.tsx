import { useAccount, useContractRead, useNetwork } from 'wagmi'
import { contractAddress, contractAbi } from '../constants'
import { useEffect, useRef, useState } from 'react'
import { returnCid } from '../utils/cid'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectImagesMetadata,
  selectImagesUrls,
  setImageMetadata,
} from '../store/slices/imageSlice'

const date = new Date()

async function createImageFiles(images, tokenId, urls) {
  const files = await Promise.all(
    images.map(async (img, i) => {
      const response = await fetch(urls[i])
      const arrayBuffer = await response.arrayBuffer()

      const blob = new Blob([arrayBuffer], { type: `image/${img.extension}` })

      return new File(
        [blob],
        img.name
          ? `${img.name.toString().replace(/ /g, '_')}.${img.extension}`
          : `${parseInt(tokenId) + 1 + i}.${img.extension}`,
        { type: `image/${img.extension}` }
      )
    })
  )
  return files
}

async function getMetadata(imagesMetadata, baseMetadata, tokenId, cid) {
  return imagesMetadata.map((img, i) => {
    const attributes = img.attributes?.map((attr) => {
      if (attr.trait_type.length === 0 || attr.value.length === 0) return
      return {
        trait_type: attr.trait_type,
        value: attr.value,
      }
    })

    const newMetadata = {
      title: tokenId
        ? `Generate NFT Collection #${parseInt(tokenId) + 1 + i}`
        : 'Generate NFT Collection',
      id: img.id,
      name: img.name || `${parseInt(tokenId) + 1 + i}`,
      author: img.author,
      tokenId: parseInt(tokenId) + 1 + i,
      description: img.description,
      ...baseMetadata,
      image: img.name
        ? `ipfs://${cid}/${img.name.toString().trim().replace(/ /g, '_')}.${
            img.extension
          }`
        : `ipfs://${cid}/${parseInt(tokenId) + 1 + i}.${img.extension}`,
      timestamp: baseMetadata.timestamp || Math.floor(date.getTime() / 1000),
      cid,
      extension: img.extension,
      attributes,
    }

    if (img.author === '') delete newMetadata.author
    if (img.description === '') delete newMetadata.description
    if (img.attributes?.length < 1) delete newMetadata.attributes

    return newMetadata
  })
}

export default function ImageMetadata({ images, setImages, children }) {
  const { address } = useAccount()
  const { chain } = useNetwork()
  const refMetadata = useRef(null)
  const [tokenId, setTokenId] = useState(null)
  const [cid, setCid] = useState(null)

  const dispacth = useDispatch()
  const reduxImageMetadata = useSelector(selectImagesMetadata)
  const urls = useSelector(selectImagesUrls)

  const baseMetadata = {
    contract: contractAddress,
    owner: address,
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
    setTokenId(tokenIdData?.toString())
  }, [tokenIdData, tokenIdSuccess, tokenIsLoading])

  useEffect(() => {
    Promise.resolve(createImageFiles(reduxImageMetadata, tokenId, urls)).then(
      (res) => setImages(res)
    )
  }, [images.length, tokenIdData, refMetadata.current])

  useEffect(() => {
    if (images.length > 0)
      Promise.resolve(returnCid(images)).then((res) => setCid(res))
  }, [images.length, tokenIdData, refMetadata.current, cid])

  useEffect(() => {
    if (
      JSON.stringify(refMetadata.current) !== JSON.stringify(reduxImageMetadata)
    ) {
      refMetadata.current = reduxImageMetadata
    }
  }, [reduxImageMetadata])

  useEffect(() => {
    Promise.resolve(
      getMetadata(reduxImageMetadata, baseMetadata, tokenId, cid)
    ).then((res) => dispacth(setImageMetadata(res)))
  }, [refMetadata.current, tokenIdData, cid])

  return <>{children}</>
}
