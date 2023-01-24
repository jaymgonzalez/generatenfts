import { contractAddress, contractAbi } from '../constants'
import {
  useContractWrite,
  usePrepareContractWrite,
  useContractRead,
} from 'wagmi'
import { BigNumber } from 'ethers'
import { returnCid, storeFiles } from '../utils/cid'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectImagesMetadata } from '../store/slices/imageSlice'
import { utils } from 'ethers'

function createMetadataFiles(metadata) {
  return metadata.map((data) => {
    const response = JSON.stringify(data)

    const blob = new Blob([response], { type: 'application/json' })

    return new File(
      [blob],
      `${data.name?.toString().trim().replace(/ /g, '_')}.json`,
      {
        type: 'application/json',
      }
    )
  })
}

export default function RunContract({ address, images, children }) {
  const metadata = useSelector(selectImagesMetadata)
  const [metadataCid, setMetadataCid] = useState('')
  const filesRef = useRef('')

  const files = createMetadataFiles(metadata)
  // returnCid(images)

  const names = metadata.map(
    (data) => `${data.name?.toString().trim().replace(/ /g, '_')}.json`
  )

  // const { data: fee } = useContractRead({
  //   address: contractAddress,
  //   abi: contractAbi,
  //   functionName: 'fee',
  // })

  // const value = parseInt(fee?.toString()) * names.length

  const { config: mintConfig } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'mint',
    args: [address, metadataCid, names],
    overrides: {
      gasLimit: BigNumber.from('10000000'),
      // value: utils.parseEther(!Number.isNaN(value) ? '10' : value.toString()),
      value: utils.parseEther('0.5'),
    },
  })

  const {
    data: mintData,
    isError: mintIsError,
    isLoading: mintIsLoading,
    isSuccess: mintIsSuccess,
    write: mintWrite,
  } = useContractWrite(mintConfig)

  // const { config: withdrawConfig } = usePrepareContractWrite({
  //   address: contractAddress,
  //   abi: contractAbi,
  //   functionName: 'withdraw',
  //   overrides: {
  //     gasLimit: BigNumber.from('10000000'),
  //     // value: utils.parseEther(!Number.isNaN(value) ? '10' : value.toString()),
  //     // value: utils.parseEther('10'),
  //   },
  // })

  // const { write: withdrawWrite } = useContractWrite(withdrawConfig)

  useEffect(() => {
    if (mintIsSuccess) {
      storeFiles(files)
      storeFiles(images)
    }
  }, [mintIsSuccess])

  useEffect(() => {
    const metadataString = JSON.stringify(metadata)
    if (metadata.length > 0 && metadataString !== filesRef.current) {
      filesRef.current = metadataString
      returnCid(files).then((res) => {
        setMetadataCid(res)
      })
    }
  }, [metadata])

  return (
    <>
      {children(mintData, mintWrite, mintIsLoading, mintIsSuccess, mintIsError)}
    </>
  )
}
