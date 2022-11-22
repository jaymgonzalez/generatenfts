const contract = require('../artifacts/contracts/AINFTs.sol/AINFTs.json')
const contractAddress = '0xF38F653C781d85F66a838C60b736c4A1f0932D57'
require('dotenv').config({ path: '.env' })

async function main() {
  const signer = await ethers.getSigner()

  const AINFT = await ethers.getContractAt(
    contract.abi,
    contractAddress,
    signer
  )
  console.log('Withdrawing funds...')

  const tx = await AINFT.withdraw({
    gasLimit: 5000000,
  })

  console.log(
    `Check yout transaction at https://mumbai.polygonscan.com/tx/${tx.hash}`
  )

  await tx.wait()

  console.log('You successfully withdraw your funds :)')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
