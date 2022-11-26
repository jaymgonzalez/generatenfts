const { ethers } = require('hardhat')
const contract = require('../artifacts/contracts/AINFTs.sol/AINFTs.json')
require('dotenv').config({ path: '.env' })
const { contractAddress, linkAbi, linkAddress } = require('../constants')

async function main() {
  const signer = await ethers.getSigner()

  const Link = await ethers.getContractAt(linkAbi, linkAddress, signer)
  const AINFTs = await ethers.getContractAt(
    contract.abi,
    contractAddress,
    signer
  )
  console.log('Minting NFT...')

  const approveTx = await Link.approve(
    AINFTs.address,
    ethers.utils.parseEther('1')
  )
  console.log('Approving token...')
  await approveTx.wait()
  console.log('Approved!')

  const setFeeTx = await AINFTs.setFee(ethers.utils.parseEther('0.01'))
  await setFeeTx.wait()

  const tx = await AINFTs.mint(signer.address, 1, 0, {
    gasLimit: 5000000,
    value: ethers.utils.parseEther('0.01'),
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