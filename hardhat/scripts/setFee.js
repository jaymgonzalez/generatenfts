const { ethers } = require('hardhat')
const contract = require('../artifacts/contracts/GNFT.sol/GNFT.json')
require('dotenv').config({ path: '.env' })
const { contractAddress } = require('../constants')
const proxyAddress = '0xC469e7aE4aD962c30c7111dc580B4adbc7E914DD'

async function main() {
  const signer = await ethers.getSigner()

  const GNFT = await ethers.getContractAt(
    contract.abi,
    // contractAddress,
    proxyAddress,
    signer
  )
  console.log('Setting fee...')
  const setFeeTx = await GNFT.setFee(ethers.utils.parseEther('0.01'))
  await setFeeTx.wait()
  console.log('Fee setted!')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
