const { ethers } = require('hardhat')
const contract = require('../artifacts/contracts/AINFTs.sol/AINFTs.json')
const contractAddress = '0xF38F653C781d85F66a838C60b736c4A1f0932D57'
require('dotenv').config({ path: '.env' })
const { linkAbi } = require('../constants')

const linkAddress = process.env.POLYGON_MUMBAI_LINK_ADDRESS

const ETH_ADDRESS = process.env.ETH_ADDRESS
const metadataURL = 'ipfs://QmaEH4QgkSWeQaM9aDEhhDTcz5wEiHfdqaYpHJyGgFsev4'

async function main() {
  const signer = await ethers.getSigner()

  const AINFT = await ethers.getContractAt(
    contract.abi,
    contractAddress,
    signer
  )
  console.log('Minting NFT...')
  const linkContract = await ethers.getContractAt(linkAbi, linkAddress, signer)

  const approveLinkTx = await linkContract.approve(
    contractAddress,
    ethers.utils.parseEther('1')
  )
  await approveLinkTx.wait()

  const tx = await AINFT.mintNFT(signer.address, metadataURL)

  console.log(
    `Check yout transaction at https://mumbai.polygonscan.com/tx/${tx.hash}`
  )

  await tx.wait()

  console.log('You successfully minted an AINTF :)')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
