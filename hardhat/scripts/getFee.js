const { ethers } = require('hardhat')
const contract = require('../artifacts/contracts/GNFT.sol/GNFT.json')
require('dotenv').config({ path: '.env' })
const { contractAddress } = require('../constants')

async function main() {
  const signer = await ethers.getSigner()

  const GNFTs = await ethers.getContractAt(
    contract.abi,
    contractAddress,
    signer
  )
  console.log('Getting current fee...')
  const getFeeTx = await GNFTs.fee()
  // await getFeeTx.wait()
  console.log(getFeeTx)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
