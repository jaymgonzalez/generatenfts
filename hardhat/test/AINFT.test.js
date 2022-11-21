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
        })
        it('Should have minted Link tokens', async function () {
          expect(await linkContract.balanceOf(owner.address)).to.equal(
            '1000000000000000000000000'
          )
        })
        it('Should fail if not enough Link for transaction', async function () {
          const baseurl = 'ipfs://test.url/'
          const overrides = {
            value: ethers.utils.parseEther('0.01'),
          }
          expect(
            await nftContract
              .connect(owner)
              .mintNFT(addr1.address, baseurl, overrides)
          ).to.be.revertedWith('ERC20: insufficient allowance')
        })
        it.only('Should allow transfer of Link tokens', async function () {
          await linkContract.approve(
            owner.address,
            ethers.utils.parseEther('100')
          )
          await linkContract.transferFrom(
            owner.address,
            addr2.address,
            ethers.utils.parseEther('100')
          )
          const balance = await linkContract.balanceOf(addr2.address)
          console.log(balance)
          expect(
            await linkContract
              .balanceOf(addr2.address)
              .to.equal('100000000000000000000')
          )
        })
        it('Should allow transfer of Link tokens', async function () {
          const baseurl = 'ipfs://test.url/'
          const overrides = {
            value: ethers.utils.parseEther('0.01'),
          }
          await linkContract
            .connect(addr1)
            .approve(owner.address, ethers.utils.parseEther('100'))
          await linkContract.transferFrom(
            addr1.address,
            addr2.address,
            ethers.utils.parseEther('100')
          )
          await nftContract
            .connect(owner)
            .mintNFT(owner.address, baseurl, overrides)

          expect(await nftContract.ownerOf(0)).to.equal(owner.address)
        })
      })
    })
