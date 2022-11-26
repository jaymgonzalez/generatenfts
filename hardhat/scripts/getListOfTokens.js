const { ethers } = require('hardhat')
const contract = require('../artifacts/contracts/AINFTs.sol/AINFTs.json')
require('dotenv').config({ path: '.env' })
const { contractAddress } = require('../constants')

async function main() {
  const signer = await ethers.getSigner()

  const AINFTs = await ethers.getContractAt(
    contract.abi,
    contractAddress,
    signer
  )

  const approvedTokens = await AINFTs.getApprovedTokenInfo()
  const numOfTokens = approvedTokens[0].length

  const FIELD_ADDR = 0
  const FIELD_COST = 1
  const FIELD_NAME = 2

  let tokenStruct = []

  for (let i = 0; i < numOfTokens; i++) {
    const token = {
      addr: approvedTokens[FIELD_ADDR][i],
      cost: ethers.utils.formatEther(approvedTokens[FIELD_COST][i]),
      name: approvedTokens[FIELD_NAME][i],
    }
    tokenStruct.push(token)
  }

  console.log(tokenStruct)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
