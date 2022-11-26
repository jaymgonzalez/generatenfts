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
  console.log('Setting fee...')
  const setFeeTx = await AINFTs.setFee(ethers.utils.parseEther('0.01'))
  await setFeeTx.wait()
  console.log('Fee setted!')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
