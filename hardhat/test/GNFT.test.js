const { expect } = require('chai')
const { ethers } = require('hardhat')
const { BigNumber, utils } = require('ethers')

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

  describe('Minting', function () {
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
      await gnft.connect(addr1).mint(addr1.address, baseUri, fileNames, {
        value: utils.parseEther('2'),
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
    it('should NOT mint NFTs if value less than fee', async () => {
      await expect(
        gnft.connect(addr1).mint(addr1.address, baseUri, fileNames, {
          value: utils.parseEther('0.1'),
        })
      ).to.be.revertedWithCustomError(gnft, 'GNFT__NotEnoughFunds')
    })
    it('should return correct URI', async () => {
      await gnft.mint(owner.address, baseUri, fileNames)
      expect(await gnft.tokenURI(0)).to.equal(
        `ipfs://${baseUri}/${fileNames[0]}`
      )
      expect(await gnft.tokenURI(1)).to.equal(
        `ipfs://${baseUri}/${fileNames[1]}`
      )
    })
  })

  describe('Only Owner', function () {
    it('should pause contract execution', async () => {
      await gnft.pause()
      expect(await gnft.paused()).to.equal(true)
    })
    it('should NOT pause contract execution', async () => {
      await expect(gnft.connect(addr1).pause()).to.be.revertedWith(
        'Ownable: caller is not the owner'
      )
    })
    it('should unpause contract execution', async () => {
      await gnft.pause()
      expect(await gnft.paused()).to.equal(true)
      await gnft.unpause()
      expect(await gnft.paused()).to.equal(false)
    })
    it('should NOT unpause contract execution', async () => {
      await expect(gnft.connect(addr1).unpause()).to.be.revertedWith(
        'Ownable: caller is not the owner'
      )
    })
  })

  describe('Withdraw', function () {
    let baseUri, fileNames, totalFee
    beforeEach(async () => {
      baseUri = 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG'
      fileNames = ['file1.jpg', 'file2.jpg']
      totalFee = utils.parseEther('10')
      await gnft.setFee(totalFee)
      await gnft.connect(addr1).mint(addr1.address, baseUri, fileNames, {
        value: utils.parseEther('20'),
      })
    })
    it('should have funds from minting', async () => {
      expect(await ethers.provider.getBalance(gnft.address)).to.equal(
        utils.parseEther('20')
      )
    })
    it('should transfer funds to owner', async () => {
      await gnft.withdraw()
      expect(await ethers.provider.getBalance(gnft.address)).to.equal(
        utils.parseEther('0')
      )
    })
    it('should NOT transfer funds to other addr', async () => {
      await expect(gnft.connect(addr1).withdraw()).to.be.revertedWith(
        'Ownable: caller is not the owner'
      )
    })
  })
})
