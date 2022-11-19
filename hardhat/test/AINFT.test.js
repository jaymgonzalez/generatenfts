const { assert, expect } = require('chai')
const { network, deployments, ethers } = require('hardhat')
const { developmentChains, networkConfig } = require('../helper-hardhat-config')
require('dotenv').config()

const POLYGON_MUMBAI_LINK_ADDRESS =
  process.env.POLYGON_MUMBAI_LINK_ADDRESS || ''

!developmentChains.includes(network.name)
  ? describe.skip
  : describe('AINFTs Unit Tests', function () {
      let AINFT,
        Link,
        nftContract,
        linkContract,
        owner,
        addr1,
        addr2,
        addr3,
        addrs
      beforeEach(async function () {
        ;[owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners()
        AINFT = await ethers.getContractFactory('AINFTs')
        Link = await ethers.getContractFactory('Link', owner)
        linkContract = await Link.deploy()
        await linkContract.deployed()

        console.log(await linkContract.balanceOf(owner.address))

        nftContract = await AINFT.deploy(linkContract.address)
      })

      describe('Deployment', function () {
        it('Should set the right owner', async function () {
          expect(await nftContract.owner()).to.equal(owner.address)
          // console.log(owner)
          // console.log(await owner.address.getBalance(linkContract.address))
        })
        it('Should have minted Link tokens', async function () {
          expect(await linkContract.balanceOf(owner.address)).to.equal(
            '1000000000000000000000000'
          )
        })
      })
    })
