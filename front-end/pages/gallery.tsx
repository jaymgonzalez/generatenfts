import NFTGallery from '../components/NFTGallery'

import { useAccount } from 'wagmi'

export default function Gallery() {
  const { address } = useAccount()
  return (
    <>
      <NFTGallery address={address} />
    </>
  )
}
