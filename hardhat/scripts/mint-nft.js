const { ethers } = require('hardhat')
const contract = require('../artifacts/contracts/AINFTs.sol/AINFTs.json')
const contractAddress = '0xe0c51c3bE40C351Aa05007D68ffB8326cab1A3f6'
require('dotenv').config({ path: '.env' })
const { linkAbi } = require('../constants')

const linkAddress = process.env.POLYGON_MUMBAI_LINK_ADDRESS

async function main() {
  const signer = await ethers.getSigner()

  const Link = await ethers.getContractAt(linkAbi, linkAddress, signer)
  const AINFTs = await ethers.getContractAt(
    contract.abi,
    contractAddress,
    signer
  )
  console.log('Minting NFT...')

  const addTx = await AINFTs.addCurrency(
    linkAddress,
    ethers.utils.parseEther('1')
  )
  console.log('Adding token...')
  await addTx.wait()
  console.log('Added!')

  const approveTx = await Link.approve(
    AINFTs.address,
    ethers.utils.parseEther('1')
  )
  console.log('Approving token...')
  await approveTx.wait()
  console.log('Approved!')

  const tx = await AINFTs.mint(signer.address, 1, 0, {
    gasLimit: 5000000,
  })

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
