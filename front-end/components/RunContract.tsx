import { contractAddress, contractAbi } from '../constants'
import {
  useContractWrite,
  usePrepareContractWrite,
  useContractRead,
} from 'wagmi'
import { BigNumber, utils } from 'ethers'
import { returnCid, storeFiles } from '../utils/cid'
import { useEffect, useState } from 'react'
import { Button, Center, Text } from '@mantine/core'

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

function mint(write, isSuccess, images, metadata) {
  // write?.()
  isSuccess && console.log(images, metadata)
  // console.log(metadata)
}

export default function RunContract({
  address,
  metadata,
  setMetadata,
  images,
}) {
  const [metadataCid, setMetadataCid] = useState('')

  const files = createMetadataFiles(metadata)
  const names = metadata.map((data) => `${data.name}.json`)

  // storeFiles(files)

  const { data: fee } = useContractRead({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'fee',
  })

  const value = parseInt(fee?.toString()) * names.length

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
      // value: utils.parseEther(!Number.isNaN(value) ? '10' : value.toString()),
      value: utils.parseEther('10'),
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
  //   functionName: 'tokenURI',
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

  // TODO:
  // PUT EXECUTION OF FILES UPLOADS IN RETURN

  useEffect(() => {
    if (mintIsSuccess)
      return () => {
        storeFiles(metadata)
        storeFiles(images)
      }
  }, [mintIsSuccess])

  useEffect(() => {
    returnCid(files).then((res) => {
      setMetadataCid(res)
    })
  }, [images, metadata])

  return (
    <>
      <div>
        <Center>
          <Text>Generating {}</Text>
          <Button disabled={!mintWrite} onClick={() => mintWrite?.()}>
            MINT
          </Button>
        </Center>
        {mintIsLoading && <div>Check Wallet</div>}
        {mintIsSuccess && <div>Transaction: {JSON.stringify(mintData)}</div>}
      </div>
    </>
  )
}
