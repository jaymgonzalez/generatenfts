const { assert, expect } = require('chai')
const { network, deployments, ethers } = require('hardhat')
const { developmentChains, networkConfig } = require('../helper-hardhat-config')
require('dotenv').config()

!developmentChains.includes(network.name)
  ? describe.skip
  : describe('AINFTs Unit Tests', function () {
      let AINFTs,
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
        AINFTs = await ethers.getContractFactory('AINFTs')
        Link = await ethers.getContractFactory('Link', owner)
        linkContract = await Link.deploy()
        nftContract = await AINFTs.deploy()
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
        it('Should add a token to the token list if owner', async function () {
          await nftContract.addCurrency(
            linkContract.address,
            ethers.utils.parseEther('1'),
            'Link 3'
          )
          const approvedTokens = await nftContract.getApprovedTokenInfo()

          expect(approvedTokens[0][0]).to.equal(linkContract.address)
          expect(approvedTokens[1][0]).to.equal('1000000000000000000')
          expect(approvedTokens[2][0]).to.equal('Link 3')
        })
        it.only('Should NOT add a token to the token list if NOT owner', async function () {
          await nftContract
            .connect(addr1)
            .addCurrency(
              linkContract.address,
              ethers.utils.parseEther('1'),
              'Link 3'
            )

          expect(approvedTokens[0][0]).to.equal(linkContract.address)
          expect(approvedTokens[1][0]).to.equal('1000000000000000000')
          expect(approvedTokens[2][0]).to.equal('Link 3')
        })
        it('Should mint the NFT', async function () {
          await nftContract.addCurrency(
            linkContract.address,
            ethers.utils.parseEther('1'),
            'Link 3'
          )

          await linkContract.approve(
            nftContract.address,
            ethers.utils.parseEther('100')
          )

          await nftContract.mint(addr1.address, 1, 0)

          expect(await nftContract.balanceOf(addr1.address)).to.equal(1)
        })
        it.only('Should allow withdraws from owner', async function () {
          await linkContract.approve(
            owner.address,
            ethers.utils.parseEther('100')
          )
          await linkContract.transferFrom(
            owner.address,
            addr2.address,
            ethers.utils.parseEther('100')
          )

          expect(await linkContract.balanceOf(addr2.address)).to.equal(
            '100000000000000000000'
          )

          // const balance = await linkContract.balanceOf(addr2.address)
          // console.log(balance)
          // expect(await linkContract.balanceOf(addr2.address).to.equal(balance))
        })
        // it('Should allow transfer of Link tokens', async function () {
        //   const baseurl = 'ipfs://test.url/'
        //   const overrides = {
        //     value: ethers.utils.parseEther('0.01'),
        //   }
        //   await linkContract
        //     .connect(addr1)
        //     .approve(owner.address, ethers.utils.parseEther('100'))
        //   await linkContract.transferFrom(
        //     addr1.address,
        //     addr2.address,
        //     ethers.utils.parseEther('100')
        //   )
        //   await nftContract
        //     .connect(owner)
        //     .mintNFT(owner.address, baseurl, overrides)

        //   expect(await nftContract.ownerOf(0)).to.equal(owner.address)
        // })
      })
    })
