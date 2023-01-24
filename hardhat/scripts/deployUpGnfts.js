const { ethers, upgrades } = require('hardhat')

async function main() {
  const GNFT = await ethers.getContractFactory('GNFT')
  const proxy = await upgrades.deployProxy(GNFT)
  await proxy.deployed()

  // console.log(await proxy.paused())

  // await proxy.pause()

  // console.log(await proxy.paused())

  // console.log('current fee: ', await proxy.fee())

  // console.log('Setting fee...')
  // const setFeeTx = await proxy.setFee(ethers.utils.parseEther('0.01'))
  // await setFeeTx.wait()
  // console.log('Fee setted!')

  // console.log('current fee: ', await proxy.fee())

  // console.log(proxy.address)

  const implementationAddress = await upgrades.erc1967.getImplementationAddress(
    proxy.address
  )

  console.log(
    await upgrades.erc1967.getAdminAddress(proxy.address),
    ' getAdminAddress'
  )

  console.log('Proxy contract address: ' + proxy.address)

  console.log('Implementation contract address: ' + implementationAddress)
}

main()

// HH
// Proxy contract address: 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
// Implementation contract address: 0x5FbDB2315678afecb367f032d93F642f64180aa3

// Mumbai
// Proxy contract address: 0x6f881A8726D06822DB2bDFaC0C55ADe965eb2A3e
// Implementation contract address: 0x1ec251C119E7e22b95D16Dc676A94D203CbfE6B6
