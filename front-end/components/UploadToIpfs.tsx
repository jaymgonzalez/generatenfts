import { Button } from '@mantine/core'
import makeStorageClient from '../web3storage'
import { pack } from 'ipfs-car/pack'
import { useAccount } from 'wagmi'

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

async function getFiles(images) {
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
  const files = await getFiles(images)
  const cid = await getCid(files)
  console.log('files cid:', cid)
  return cid
}

async function getMetadata(images, metadata) {
  const cid = await returnCid(images)
  const newMetadata = images.map((img) => {
    const newMetadata = {
      ...metadata,
      asset_url: `ipfs://${cid}/${img.nftName}.${img.extension}`,
    }
    return newMetadata
  })
  return newMetadata
}

export default function UploadToIpfs({ imageData }) {
  const { address } = useAccount()
  const date = new Date()
  const baseMetadata = {
    title: 'Generate NFT ', // choose by user (Name + Creator)
    id: '0x0123456789abcdef', // ??????
    contract: '0x9876543210fedcba', // contract that minted it
    asset_url: 'https://example.com/assets/0123456789abcdef.png',
    owner: address, // wallet address
    timestamp: Math.floor(date.getTime() / 1000),
    name: 'My Awesome NFT',
    description:
      'This is a unique and valuable digital asset that represents ownership of a special piece of digital content.',
    attributes: [
      // {
      //   trait_type: 'Background',
      //   value: 'Green',
      // },
      {
        trait_type: 'Head',
        value: 'Hat',
      },
      {
        trait_type: 'Level',
        display_type: 'number',
        value: 10,
      },
    ],
  }

  const metadataArray = Promise.resolve(getMetadata(imageData, baseMetadata))
  // const cid = returnCid(imageData)

  metadataArray.then((res) => console.log(res))

  return (
    <>
      <Button onClick={() => {}}></Button>
      <div>Holi</div>
    </>
  )
}

// bafybeid6tazpnt2i4j3nznx25nt6d2e74cz22kqu2i4nnluyvndv65ekbq
