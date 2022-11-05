const { getNamedAccounts, ethers } = require('hardhat')
const { utils } = require('ethers')
const contract = require('../artifacts/contracts/AINFTs.sol/AINFTs.json')
const contractAddress = '0x4a2fc7340C5C8A0C2b70c02f1287ACAB9Eedfc29'
require('dotenv').config({ path: '.env' })

const ETH_ADDRESS = process.env.ETH_ADDRESS
const metadataURL = 'ipfs://QmaEH4QgkSWeQaM9aDEhhDTcz5wEiHfdqaYpHJyGgFsev4'

async function main() {
  const { deployer } = await getNamedAccounts()

  const AINFT = await ethers.getContractAt(
    contract.abi,
    contractAddress,
    deployer
  )
  console.log('Minting NFT...')

  const tx = await AINFT.mintNFT(ETH_ADDRESS, metadataURL, {
    value: utils.parseEther('0.01'),
  })

  console.log(
    `Check yout transaction at https://goerli.etherscan.io/tx/${tx.hash}`
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
