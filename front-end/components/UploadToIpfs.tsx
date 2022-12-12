import { Button } from '@mantine/core'
import makeStorageClient from '../web3storage'
import { pack } from 'ipfs-car/pack'

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

export default function UploadToIpfs({ imageData }) {
  const cid = Promise.resolve(returnCid(imageData))

  console.log(cid.then((cid) => cid))

  return (
    <>
      <Button onClick={() => {}}></Button>
      <div>Holi</div>
    </>
  )
}

// bafybeid6tazpnt2i4j3nznx25nt6d2e74cz22kqu2i4nnluyvndv65ekbq
