import { pack } from 'ipfs-car/pack'
import { BaseBlockstore } from 'blockstore-core'
import makeStorageClient from '../web3storage'

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

export async function getCid(files) {
  const blockstore = new BaseBlockstore()
  try {
    const { root } = await pack({
      input: Array.from(files).map(toImportCandidate),
      // blockstore,
      wrapWithDirectory: true,
      maxChunkSize: 1048576,
      maxChildrenPerNode: 1024,
    })
    return root.toString()
  } catch (err) {
    console.log(err)
  }
}

export async function storeFiles(files) {
  const client = makeStorageClient()
  const cid = await client.put(files)
  console.log('stored files with cid:', cid)
  return cid
}

export async function returnCid(files) {
  const cid = await getCid(files)
  console.log('files cid:', cid)
  return cid
}
