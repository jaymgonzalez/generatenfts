const { ethers } = require('hardhat')
const contract = require('../artifacts/contracts/GNFT.sol/GNFT.json')
require('dotenv').config({ path: '.env' })
const { contractAddress } = require('../constants')

async function main() {
  const signer = await ethers.getSigner()

  const GNFT = await ethers.getContractAt(contract.abi, contractAddress, signer)
  console.log('Setting fee...')
  const setFeeTx = await GNFT.setFee(ethers.utils.parseEther('1'))
  await setFeeTx.wait()
  console.log('Fee setted!')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
