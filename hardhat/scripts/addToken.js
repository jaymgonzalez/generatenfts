const { ethers } = require('hardhat')
const contract = require('../artifacts/contracts/AINFTs.sol/AINFTs.json')
require('dotenv').config({ path: '.env' })
const { linkAbi, contractAddress, linkAddress } = require('../constants')

async function main() {
  const signer = await ethers.getSigner()

  const Link = await ethers.getContractAt(linkAbi, linkAddress, signer)
  const AINFTs = await ethers.getContractAt(
    contract.abi,
    contractAddress,
    signer
  )

  const addTx = await AINFTs.addCurrency(
    linkAddress,
    ethers.utils.parseEther('1'),
    'Link 3'
  )
  console.log('Adding token...')
  await addTx.wait()
  console.log('Added!')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
