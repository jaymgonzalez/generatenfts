import { contractAddress, contractAbi } from '../constants'
import {
  useContractWrite,
  usePrepareContractWrite,
  useContractRead,
} from 'wagmi'
import { BigNumber } from 'ethers'
import { returnCid } from '../utils/cid'
import { useState } from 'react'

// console.log(contract)

// async function owner(contract) {
//   console.log(await contract.owner())
// }

function createMetadataFiles(metadata) {
  return metadata.map((data) => {
    const response = JSON.stringify(data)

    const blob = new Blob([response], { type: 'application/json' })

    return new File([blob], `${data.name}.json`, {
      type: 'application/json',
    })
  })
}

export default function RunContract({ address, metadata }) {
  const [metadataCid, setMetadataCid] = useState('')

  const files = createMetadataFiles(metadata)
  const ids = metadata.map((data) => data.id)
  const names = metadata.map((data) => `${data.name}.json`)

  returnCid(files).then((res) => {
    setMetadataCid(res)
  })

  console.log(metadataCid)

  const { config: mintConfig } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'mint',
    args: [address, metadataCid, names, ids],
    onSuccess(data) {
      console.log('Success', data)
    },
    overrides: {
      gasLimit: BigNumber.from('10000000'),
    },
  })

  const {
    data: mintData,
    isLoading: mintIsLoading,
    isSuccess: mintIsSuccess,
    write: mintWrite,
  } = useContractWrite(mintConfig)

  // const { data, isError, isLoading, isSuccess } = useContractRead({
  //   address: contractAddress,
  //   abi: contractAbi,
  //   functionName: 'fee',
  //   // onSuccess(data) {
  //   //   console.log('Success', data)
  //   // },
  // })

  // console.log(mintConfig)

  // console.log(isError)

  // console.log(mintWrite)

  return (
    <>
      <div>
        <button disabled={!mintWrite} onClick={() => mintWrite?.()}>
          Feed
        </button>
        {mintIsLoading && <div>Check Wallet</div>}
        {mintIsSuccess && <div>Transaction: {JSON.stringify(mintData)}</div>}
      </div>
    </>
  )
}
