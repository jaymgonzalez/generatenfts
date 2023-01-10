import NFTGallery from '../components/NFTGallery'

import { useAccount } from 'wagmi'
import SiweAuthenticatedPage from '../components/SiweAuthenticated'

export default function Gallery() {
  const { address } = useAccount()
  return (
    <>
      <SiweAuthenticatedPage address={address}>
        <NFTGallery address={address} />
      </SiweAuthenticatedPage>
    </>
  )
}
