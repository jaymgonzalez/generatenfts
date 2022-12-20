require('dotenv').config()

async function main() {
  const GNFT = await ethers.getContractFactory('GNFT')

  // Start deployment, returning a promise that resolves to a contract object
  const deployedGNFT = await GNFT.deploy()
  console.log('Deploying...')
  await deployedGNFT.deployed()
  console.log('Contract deployed to address:', deployedGNFT.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
