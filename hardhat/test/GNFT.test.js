const { assert, expect } = require('chai')
const { network, deployments, ethers } = require('hardhat')
const { BigNumber, utils } = require('ethers')
const { developmentChains, networkConfig } = require('../helper-hardhat-config')
require('dotenv').config()

describe('GNFT Unit Tests', function () {
  let GNFT, gnft, owner, addr1

  beforeEach(async () => {
    ;[owner, addr1] = await ethers.getSigners()
    GNFT = await ethers.getContractFactory('GNFT')
    gnft = await upgrades.deployProxy(GNFT)
    await gnft.deployed()
  })

  describe('Deployment', function () {
    it('Should set the right owner', async function () {
      expect(await gnft.owner()).to.equal(owner.address)
    })
    it('Should initialize the proxy contract with empty variables values', async function () {
      expect(await gnft.fee()).to.equal(BigNumber.from('0'))
    })
    it('Should update variables values', async function () {
      await gnft.setFee(100)
      expect(await gnft.fee()).to.equal(BigNumber.from('100'))
    })
  })

  describe.only('Minting', function () {
    let baseUri, fileNames, totalFee
    beforeEach(async () => {
      baseUri = 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG'
      fileNames = ['file1.jpg', 'file2.jpg']
      totalFee = utils.parseEther('1')
      await gnft.setFee(totalFee)
    })
    it('should mint NFTs for owner with no fee', async () => {
      await gnft.mint(owner.address, baseUri, fileNames)
      const balance = await gnft.balanceOf(owner.address)
      expect(balance).to.equal(2)
    })
    it('should mint NFTs for other address', async () => {
      await gnft.mint(addr1.address, baseUri, fileNames, {
        value: totalFee,
      })
      const balance = await gnft.balanceOf(addr1.address)
      expect(balance).to.equal(2)
    })
    it('should NOT mint NFTs if no file names are passed', async () => {
      await expect(
        gnft.mint(owner.address, baseUri, [], {
          value: totalFee,
        })
      ).to.be.revertedWithCustomError(gnft, 'GNFT__NftToMintLowerThanOne')
    })

    // console.log(receipt)
    // expect(receipt.logs).to.have.lengthOf(1)
    // const event = receipt.logs[0]
    // expect(event.event).to.be.equal('Transfer')
    // expect(event.args.from).to.be.equal(
    //   '0x0000000000000000000000000000000000000000'
    // )
    // expect(event.args.to).to.be.equal(other)
    // expect(event.args.tokenId.toNumber()).to.be.above(0)
  })
  // it('Should have minted Link tokens', async function () {
  //   expect(await linkContract.balanceOf(owner.address)).to.equal(
  //     '1000000000000000000000000'
  //   )
  // })
  // describe('addCurrency', function () {
  //   it('Should add a token to the token list if owner', async function () {
  //     await gnft.addCurrency(
  //       linkContract.address,
  //       ethers.utils.parseEther('1'),
  //       'Link 3'
  //     )
  //     const approvedTokens = await gnft.getApprovedTokenInfo()

  //     expect(approvedTokens[0][0]).to.equal(linkContract.address)
  //     expect(approvedTokens[1][0]).to.equal('1000000000000000000')
  //     expect(approvedTokens[2][0]).to.equal('Link 3')
  //     expect(await gnft.currenciesAdded()).to.equal(1)
  //   })
  //   it('Should NOT add a token to the token list if NOT owner', async function () {
  //     await expect(
  //       gnft
  //         .connect(addr1)
  //         .addCurrency(
  //           linkContract.address,
  //           ethers.utils.parseEther('1'),
  //           'Link 3'
  //         )
  //     ).to.be.revertedWith('Ownable: caller is not the owner')
  //   })
  // })
  // describe('mint', function () {
  //   it('Should mint the NFT', async function () {
  //     await gnft.addCurrency(
  //       linkContract.address,
  //       ethers.utils.parseEther('1'),
  //       'Link 3'
  //     )

  //     await linkContract.approve(
  //       gnft.address,
  //       ethers.utils.parseEther('100')
  //     )

  //     await gnft.mint(addr1.address, 1, 0)

  //     expect(await gnft.balanceOf(addr1.address)).to.equal(1)
  //   })
  //   it('Should mint with not owner addr ', async function () {
  //     await gnft.addCurrency(
  //       linkContract.address,
  //       ethers.utils.parseEther('1'),
  //       'Link 3'
  //     )

  //     await linkContract
  //       .connect(addr1)
  //       .approve(gnft.address, ethers.utils.parseEther('100'))

  //     await linkContract.approve(owner.address, ethers.utils.parseEther('100'))
  //     await linkContract.transferFrom(
  //       owner.address,
  //       addr1.address,
  //       ethers.utils.parseEther('100')
  //     )

  //     await gnft.connect(addr1).mint(addr1.address, 1, 0)
  //     expect(await gnft.balanceOf(addr1.address)).to.equal(1)
  //   })
  //   it('Should NOT mint if not enough ERC20 funds ', async function () {
  //     await gnft.addCurrency(
  //       linkContract.address,
  //       ethers.utils.parseEther('1000'),
  //       'Link 3'
  //     )
  //     await linkContract.approve(owner.address, ethers.utils.parseEther('100'))
  //     await linkContract.transferFrom(
  //       owner.address,
  //       addr1.address,
  //       ethers.utils.parseEther('100')
  //     )

  //     await linkContract
  //       .connect(addr1)
  //       .approve(gnft.address, ethers.utils.parseEther('100'))

  //     await expect(
  //       gnft.connect(addr1).mint(addr1.address, 1, 0)
  //     ).to.be.revertedWith('ERC20: insufficient allowance')
  //   })
  // })
})
