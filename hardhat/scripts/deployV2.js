const { ethers, upgrades } = require('hardhat')

const proxyAddress = '0x5a8E771b5D0B3d2e4d218478CB7C9029d00c4e5a'

async function main() {
  console.log(proxyAddress, ' original GNFT(proxy) address')
  const GNFTv2 = await ethers.getContractFactory('GNFTv2')
  console.log('upgrade to GNFTv2...')
  const gnftV2 = await upgrades.upgradeProxy(proxyAddress, GNFTv2)
  console.log(gnftV2.address, ' GNFTv2 address(should be the same)')

  console.log(
    await upgrades.erc1967.getImplementationAddress(gnftV2.address),
    ' getImplementationAddress'
  )
  console.log(
    await upgrades.erc1967.getAdminAddress(gnftV2.address),
    ' getAdminAddress'
  )
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
