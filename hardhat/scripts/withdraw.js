const contract = require('../artifacts/contracts/AINFTs.sol/AINFTs.json')
const { contractAddress } = require('../constants')
require('dotenv').config({ path: '.env' })

async function main() {
  const signer = await ethers.getSigner()

  const AINFT = await ethers.getContractAt(
    contract.abi,
    contractAddress,
    signer
  )
  console.log('Withdrawing token funds...')

  const tokenTx = await AINFT.withdrawToken(0, {
    gasLimit: 50000,
  })

  console.log(
    `Check yout transaction at https://mumbai.polygonscan.com/tx/${tokenTx.hash}`
  )

  await tokenTx.wait()

  console.log('You successfully withdraw your token funds :)')

  console.log('Withdrawing funds...')

  const maticTx = await AINFT.withdraw()

  console.log(
    `Check yout transaction at https://mumbai.polygonscan.com/tx/${maticTx.hash}`
  )

  await maticTx.wait()

  console.log('You successfully withdraw your token funds :)')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
