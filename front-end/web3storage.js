import { Web3Storage } from 'web3.storage'

export default function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() })
}

function getAccessToken() {
  return process.env.NEXT_PUBLIC_WEB3_STORAGE_API_KEY
}
