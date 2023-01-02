import { contractAddress, contractAbi } from '../constants'
import {
  useContractWrite,
  usePrepareContractWrite,
  useContractRead,
} from 'wagmi'
import { BigNumber } from 'ethers'
import { returnCid, storeFiles } from '../utils/cid'
import { useEffect, useState } from 'react'
import { Button, Center, Text } from '@mantine/core'
import NFTGallery from './NFTGallery'

function createMetadataFiles(metadata) {
  return metadata.map((data) => {
    console.log(data)

    const response = JSON.stringify(data)

    const blob = new Blob([response], { type: 'application/json' })

    return new File(
      [blob],
      `${data.name.toString().trim().replace(/ /g, '_')}.json`,
      {
        type: 'application/json',
      }
    )
  })
}

export default function RunContract({ address, metadata, images }) {
  const [metadataCid, setMetadataCid] = useState('')

  const files = createMetadataFiles(metadata)
  // returnCid(images)

  const names = metadata.map(
    (data) => `${data.name.toString().trim().replace(/ /g, '_')}.json`
  )
  console.log(names)

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
    overrides: {
      gasLimit: BigNumber.from('10000000'),
      // value: utils.parseEther(!Number.isNaN(value) ? '10' : value.toString()),
      // value: utils.parseEther('10'),
    },
  })

  const {
    data: mintData,
    isLoading: mintIsLoading,
    isSuccess: mintIsSuccess,
    write: mintWrite,
  } = useContractWrite(mintConfig)

  const { config: withdrawConfig } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'withdraw',
    overrides: {
      gasLimit: BigNumber.from('10000000'),
      // value: utils.parseEther(!Number.isNaN(value) ? '10' : value.toString()),
      // value: utils.parseEther('10'),
    },
  })

  const { write: withdrawWrite } = useContractWrite(withdrawConfig)

  useEffect(() => {
    if (mintIsSuccess) {
      storeFiles(files)
      storeFiles(images)
    }
  }, [mintIsSuccess])

  useEffect(() => {
    returnCid(files).then((res) => {
      setMetadataCid(res)
    })
  }, [metadata])

  return (
    <>
      <div>
        <Center>
          <Text>Generating {}</Text>
          <Button disabled={!mintWrite} onClick={() => mintWrite?.()}>
            MINT
          </Button>
          <Button disabled={!withdrawWrite} onClick={() => withdrawWrite?.()}>
            Withdraw
          </Button>
        </Center>
        {mintIsLoading && <div>Check Wallet</div>}
        {mintIsSuccess && <div>Transaction: {JSON.stringify(mintData)}</div>}
      </div>
      {/* <NFTGallery address={address} /> */}
    </>
  )
}
