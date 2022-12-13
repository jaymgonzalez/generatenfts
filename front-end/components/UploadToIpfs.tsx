import { Button } from '@mantine/core'
import makeStorageClient from '../web3storage'
import { pack } from 'ipfs-car/pack'
import { useAccount, useNetwork } from 'wagmi'
import { contractAddress } from '../constants'
import { useEffect } from 'react'

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

async function CreateFiles(images) {
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
  const files = await CreateFiles(images)
  const cid = await getCid(files)
  console.log('files cid:', cid)
  return cid
}

function id() {
  return `0x${Math.random().toString(36).substring(2, 12)}`
}

async function getMetadata(images, metadata) {
  const cid = await returnCid(images)
  const newMetadata = images.map((img) => {
    const attributes = img.parameters?.map((attr) => {
      if (attr.parameter.length === 0) return
      return {
        trait_type: attr.parameter,
        value: attr.value,
      }
    })

    const newMetadata = {
      ...metadata,
      asset_url: `ipfs://${cid}/${img.nftName}.${img.extension}`,
      name: img.nftName,
      id: id(),
    }

    if (attributes[0]) newMetadata.attributes = attributes
    if (img.description) newMetadata.description = img.description
    return newMetadata
  })
  return newMetadata
}

export default function UploadToIpfs({ imageData, metadata, setMetadata }) {
  const { address } = useAccount()
  const { chain } = useNetwork()
  const date = new Date()

  const baseMetadata = {
    title: 'Generate NFT ', // choose by user (Name + Creator)
    contract: contractAddress, // contract that minted it
    owner: address, // wallet address
    timestamp: Math.floor(date.getTime() / 1000),
    network: chain.name,
  }

  useEffect(() => {
    const metadataArray = Promise.resolve(getMetadata(imageData, baseMetadata))
    metadataArray.then((res) => setMetadata(res))

    console.log(metadata)
  }, [imageData])

  return (
    <>
      <Button onClick={() => {}}></Button>
      <div>Holi</div>
    </>
  )
}

// bafybeid6tazpnt2i4j3nznx25nt6d2e74cz22kqu2i4nnluyvndv65ekbq
