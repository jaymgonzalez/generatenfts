import { contractAddress, contractAbi } from '../constants'
import {
  useContractWrite,
  usePrepareContractWrite,
  useContractRead,
} from 'wagmi'
import { BigNumber, utils } from 'ethers'
import { returnCid, storeFiles } from '../utils/cid'
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
  const names = metadata.map((data) => `${data.name}.json`)

  // storeFiles(files)

  returnCid(files).then((res) => {
    setMetadataCid(res)
  })

  // console.log(metadataCid)

  const { config: mintConfig } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'mint',
    args: [address, metadataCid, names],
    // onSuccess(data) {
    //   console.log('Success', data)
    // },
    overrides: {
      gasLimit: BigNumber.from('10000000'),
      // value: utils.parseEther('10'),
    },
  })

  // const { config: setFeeConfig } = usePrepareContractWrite({
  //   address: contractAddress,
  //   abi: contractAbi,
  //   functionName: 'setFee',
  //   args: [0],
  //   // onSuccess(data) {
  //   //   console.log('Success', data)
  //   // },
  //   // overrides: {
  //   //   gasLimit: BigNumber.from('10000000'),
  //   //   value: utils.parseEther('10'),
  //   // },
  // })

  const {
    data: mintData,
    isLoading: mintIsLoading,
    isSuccess: mintIsSuccess,
    write: mintWrite,
  } = useContractWrite(mintConfig)

  // const { data } = useContractRead({
  //   address: contractAddress,
  //   abi: contractAbi,
  //   functionName: 'getTokenUri',
  //   // watch: true,
  //   args: [2],
  //   onSuccess(data) {
  //     console.log('Success', data)
  //   },
  // })

  // const {
  //   data: tokenId,
  //   isError,
  //   isLoading,
  //   isSuccess,
  // } = useContractRead({
  //   address: contractAddress,
  //   abi: contractAbi,
  //   functionName: '_tokenId',
  //   // watch: true,
  //   // args: [0],
  //   onSuccess(data) {
  //     console.log('Success', data)
  //   },
  // })

  // console.log(tokenId.toString())

  // console.log(isLoading)

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
