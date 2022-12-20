const { ethers } = require('hardhat')
const contract = require('../artifacts/contracts/GNFT.sol/GNFT.json')
require('dotenv').config({ path: '.env' })
const { contractAddress } = require('../constants')

async function main() {
  const signer = await ethers.getSigner()

  const AINFTs = await ethers.getContractAt(
    contract.abi,
    contractAddress,
    signer
  )
  console.log('Getting current fee...')
  const setFeeTx = await AINFTs.fee()
  // await setFeeTx.wait()
  console.log(setFeeTx)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
