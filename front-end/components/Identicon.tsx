import { useEffect, useRef } from 'react'
import { useAccount } from 'wagmi'
import Jazzicon from '@metamask/jazzicon'

export default function Identicon({ size }) {
  const ref = useRef<HTMLDivElement>()
  const { address } = useAccount()

  useEffect(() => {
    if (address && ref.current) {
      ref.current.innerHTML = ''
      ref.current.appendChild(
        Jazzicon(size, parseInt(address.slice(2, 10), 16))
      )
    }
  }, [address])

  return <div ref={ref as any}></div>
}
