import { contractAddress, contractAbi } from '../constants'
import {
  useContractWrite,
  usePrepareContractWrite,
  useContractRead,
} from 'wagmi'
import { BigNumber } from 'ethers'

// console.log(contract)

// async function owner(contract) {
//   console.log(await contract.owner())
// }

export default function RunContract({ address, metadata }) {
  console.log(metadata)

  const { config: mintConfig } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'mint',
    args: [address, 1, '0'],
    // args: [10],
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
