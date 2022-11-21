const { getNamedAccounts, ethers, provider } = require('hardhat')
const { utils } = require('ethers')
const contract = require('../artifacts/contracts/N2d.sol/N2d.json')
const contractAddress = '0xc1bb58dbf8F1632E1C4BA4a47aA90afB9a335cD4'
require('dotenv').config({ path: '.env' })
const { linkAbi } = require('../constants')

const linkAddress = process.env.POLYGON_MUMBAI_LINK_ADDRESS
const ETH_ADDRESS = process.env.ETH_ADDRESS
const metadataURL = 'ipfs://QmaEH4QgkSWeQaM9aDEhhDTcz5wEiHfdqaYpHJyGgFsev4'

async function main() {
  const signer = await ethers.getSigner()

  const Link = await ethers.getContractAt(linkAbi, linkAddress, signer)
  const N2d = await ethers.getContractAt(contract.abi, contractAddress, signer)
  console.log('Minting NFT...')

  const approveTx = await Link.approve(N2d.address, 2)
  console.log(await approveTx)
  await approveTx.wait()

  const addTx = await N2d.addCurrency(linkAddress, 1)
  console.log(await addTx)
  await addTx.wait()

  const tx = await N2d.mint(signer.address, 1, 0, {
    gasLimit: 5000000,
  })

  console.log(
    `Check yout transaction at https://mumbai.polygonscan.com/tx/${tx.hash}`
  )

  await tx.wait()

  console.log('You successfully minted an AINTF :)')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
