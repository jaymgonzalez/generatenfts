const { ethers } = require('hardhat')
const contract = require('../artifacts/contracts/GNFT.sol/GNFT.json')
require('dotenv').config({ path: '.env' })
const { contractAddress } = require('../constants')

async function main() {
  const signer = await ethers.getSigner()

  const GNFT = await ethers.getContractAt(contract.abi, contractAddress, signer)

  const owner = await GNFT.owner()

  console.log('Owner address is:', owner)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
