import NFTGallery from '../components/NFTGallery'

import { useAccount } from 'wagmi'
import AuthenticatedPage from '../components/Authenticated'

export default function Gallery() {
  const { address } = useAccount()
  return (
    <>
      <AuthenticatedPage address={address}>
        <NFTGallery address={address} />
      </AuthenticatedPage>
    </>
  )
}
