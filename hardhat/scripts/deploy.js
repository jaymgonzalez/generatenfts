require('dotenv').config()

async function main() {
  const AINFTs = await ethers.getContractFactory('AINFTs')
  const ERC20Address = process.env.POLYGON_MUMBAI_LINK_ADDRESS

  // Start deployment, returning a promise that resolves to a contract object
  const deployedAINFTs = await AINFTs.deploy()
  await deployedAINFTs.deployed()
  console.log('Contract deployed to address:', deployedAINFTs.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
