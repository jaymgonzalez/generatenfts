import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectImagesMetadata } from '../store/slices/imageSlice'
import {
  useContractWrite,
  usePrepareContractWrite,
  useContractRead,
} from 'wagmi'
import { BigNumber } from 'ethers'
import { returnCid, storeFiles } from '../utils/cid'
import { contractAddress, contractAbi } from '../constants'

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
  const [fee, setFee] = useState(0)
  const filesRef = useRef('')

  const files = createMetadataFiles(metadata)

  const names = metadata.map(
    (data) => `${data.name?.toString().trim().replace(/ /g, '_')}.json`
  )

  const { config: mintConfig } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'mint',
    args: [address, metadataCid, names],
    overrides: {
      gasLimit: BigNumber.from('10000000'),
      value: BigNumber.from(
        `${fee !== undefined || Number.isNaN(fee) ? 0 : fee}`
      ),
    },
  })

  const {
    data: mintData,
    isError: mintIsError,
    isLoading: mintIsLoading,
    isSuccess: mintIsSuccess,
    write: mintWrite,
  } = useContractWrite(mintConfig)

  const { data: feeData } = useContractRead({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'fee',
  })

  const { data: owner } = useContractRead({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'owner',
  })

  useEffect(() => {
    setFee(parseInt(feeData?.toString()) * names.length)
    if (address === owner) setFee(0)
  }, [feeData, names.length])

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
