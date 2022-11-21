require('dotenv').config()

async function main() {
  const N2d = await ethers.getContractFactory('N2d')
  // const ERC20Address = process.env.POLYGON_MUMBAI_LINK_ADDRESS

  // Start deployment, returning a promise that resolves to a contract object
  const deployedN2d = await N2d.deploy()
  await deployedN2d.deployed()
  console.log('Contract deployed to address:', deployedN2d.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
