import NFTGallery from '../components/NFTGallery'

import { useAccount, useNetwork } from 'wagmi'
import ConnectWallet from '../components/ConnectWallet'
import ConnectNetwork from '../components/ConnectNetwork'
import Navbar from '../components/Navbar'
// import SiweAuthenticatedPage from '../components/SiweAuthenticated'

export default function Gallery() {
  const { address } = useAccount()
  const { chain } = useNetwork()
  return (
    <>
      {/* <SiweAuthenticatedPage address={address}> */}
      <Navbar />
      {address ? (
        !chain.unsupported ? (
          <NFTGallery address={address} />
        ) : (
          <ConnectNetwork />
        )
      ) : (
        <ConnectWallet />
      )}
      {/* </SiweAuthenticatedPage> */}
    </>
  )
}
