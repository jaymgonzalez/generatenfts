import { contractAddress, contractAbi } from '../constants'
import { useContractWrite, usePrepareContractWrite, useAccount } from 'wagmi'
import { BigNumber } from 'ethers'

// console.log(contract)

// async function owner(contract) {
//   console.log(await contract.owner())
// }

export default function RunContract() {
  const { address } = useAccount()
  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'mint',
    args: [address, 1, 0],
    // args: [0],
    onSuccess(data) {
      console.log('Success', data)
    },
    overrides: {
      gasLimit: BigNumber.from('10000000'),
    },
  })
  console.log(config)

  const { data, isLoading, isSuccess, write } = useContractWrite(config)

  console.log(write)

  return (
    <>
      <div>
        <button disabled={!write} onClick={() => write?.()}>
          Feed
        </button>
        {isLoading && <div>Check Wallet</div>}
        {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
      </div>
    </>
  )
}
