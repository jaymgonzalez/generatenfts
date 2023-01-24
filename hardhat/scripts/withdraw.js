const contract = require('../artifacts/contracts/GNFT.sol/GNFT.json')
const { contractAddress } = require('../constants')
require('dotenv').config({ path: '.env' })

async function main() {
  const signer = await ethers.getSigner()

  const GNFT = await ethers.getContractAt(contract.abi, contractAddress, signer)

  // await signer.call(signer)

  console.log('Withdrawing funds...')

  const tx = await GNFT.withdraw()

  // console.log(
  //   `Check yout transaction at https://mumbai.polygonscan.com/tx/${maticTx.hash}`
  // )

  await tx.wait()

  console.log('You successfully withdraw contract funds :)')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
