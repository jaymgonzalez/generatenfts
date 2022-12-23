import { useRouter } from 'next/router'
import { Network, Alchemy, Nft } from 'alchemy-sdk'
import { useEffectOnce } from '../../../hooks/useEffectOnce'
import { useEffect, useState } from 'react'

export default function NFTPage() {
  const router = useRouter()
  const contract = router.query.contract as string
  const tokenId = router.query.tokenId as string

  const [nftMetadata, setNftMetadata] = useState(null)

  const settings = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_MUMBAI_API_KEY,
    network: Network.MATIC_MUMBAI,
  }

  const alchemy = new Alchemy(settings)

  if (contract && tokenId)
    useEffectOnce(() => {
      alchemy.nft
        .getNftMetadata(contract, tokenId)
        .then((res) => setNftMetadata(res))
    })

  console.log(nftMetadata)

  return (
    <>
      <h1>Post: {contract}</h1>
      <h1>Comment: {tokenId}</h1>
    </>
  )
}
