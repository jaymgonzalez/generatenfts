import NFTGallery from '../components/NFTGallery'

import { useAccount } from 'wagmi'
import SiweAuthenticatedPage from '../components/SiweAuthenticated'
import ConnectWallet from '../components/ConnectWallet'

export default function Gallery() {
  const { address } = useAccount()
  return (
    <>
      {/* <SiweAuthenticatedPage address={address}> */}
      {address ? <NFTGallery address={address} /> : <ConnectWallet />}
      {/* </SiweAuthenticatedPage> */}
    </>
  )
}
