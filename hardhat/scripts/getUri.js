const { ethers } = require('hardhat')
const contract = require('../artifacts/contracts/GNFT.sol/GNFT.json')
require('dotenv').config({ path: '.env' })
const { contractAddress } = require('../constants')

async function main() {
  const signer = await ethers.getSigner()

  const GNFT = await ethers.getContractAt(contract.abi, contractAddress, signer)

  const supply = await GNFT._tokenId()

  const numOfNfts = parseInt(supply.toString())

  console.log(numOfNfts)

  const tokenUri = []

  let i = 0

  while (i <= numOfNfts) {
    tokenUri.push(await GNFT.tokenURI(i))
    i++
  }

  console.log(tokenUri)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
