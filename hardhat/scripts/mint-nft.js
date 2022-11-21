const { getNamedAccounts, ethers, provider } = require('hardhat')
const { utils } = require('ethers')
const contract = require('../artifacts/contracts/AINFTs.sol/AINFTs.json')
const contractAddress = '0x06CE25aFCC5575A1945866357BaaD3f7967fD2F0'
require('dotenv').config({ path: '.env' })

const ETH_ADDRESS = process.env.ETH_ADDRESS
const metadataURL = 'ipfs://QmaEH4QgkSWeQaM9aDEhhDTcz5wEiHfdqaYpHJyGgFsev4'

async function main() {
  const signer = await ethers.getSigner()

  const AINFT = await ethers.getContractAt(
    contract.abi,
    contractAddress,
    signer
  )
  console.log('Minting NFT...')

  const tx = await AINFT.mintNFT(signer.address, metadataURL, {
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
