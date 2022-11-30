import { useEffect, useRef } from 'react'
import { createStyles } from '@mantine/core'
import { useAccount } from 'wagmi'
import Jazzicon from '@metamask/jazzicon'

const useStyles = createStyles(() => ({
  icon: {
    height: '1rem',
    width: '1rem',
    borderRadius: '1.125rem',
    backgroundColor: 'black',
    marginLeft: '0.5rem',
    marginRight: '0.5rem',
  },
}))

export default function Identicon() {
  const { classes } = useStyles()
  const ref = useRef<HTMLDivElement>()
  const { address } = useAccount()

  useEffect(() => {
    if (address && ref.current) {
      ref.current.innerHTML = ''
      ref.current.appendChild(Jazzicon(16, parseInt(address.slice(2, 10), 16)))
    }
  }, [address])

  return <div ref={ref as any} className={classes.icon}></div>
}
