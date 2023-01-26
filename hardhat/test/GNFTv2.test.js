const { expect, assert } = require('chai')
const { ethers } = require('hardhat')
const { BigNumber, utils } = require('ethers')

describe('GNFTv2 Unit Tests', function () {
  let GNFT,
    GNFTv2,
    gnft,
    gnftV2,
    owner,
    addr1,
    baseUri,
    fileNames,
    totalFee,
    mintEvent,
    mintTx

  beforeEach(async () => {
    ;[owner, addr1] = await ethers.getSigners()
    GNFT = await ethers.getContractFactory('GNFT')
    GNFTv2 = await ethers.getContractFactory('GNFTv2')

    gnft = await upgrades.deployProxy(GNFT)
    await gnft.deployed()

    gnftV2 = await upgrades.upgradeProxy(gnft.address, GNFTv2)

    baseUri = 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG'
    fileNames = ['file1.jpg', 'file2.jpg']
    totalFee = utils.parseEther('10')
    await gnft.setFee(totalFee)

    mintTx = await gnftV2
      .connect(addr1)
      .mint(addr1.address, baseUri, fileNames, {
        value: utils.parseEther('20'),
      })
    receiptTx = await mintTx.wait()
    mintEvent = receiptTx.events.filter((x) => x.event === 'Minted')
  })
  describe('After upgrade', function () {
    it('should emit a Minted event', async () => {
      assert(mintEvent, 'Expected a Purchase event to be emitted!')
      assert.equal(
        mintEvent.length,
        2,
        'Expected 2 events to have being triggered!'
      )
      assert.equal(
        mintEvent[0].args.tokenUri,
        `ipfs://${baseUri}/${fileNames[0]}`,
        'Expected the token URI to match.'
      )
      assert.equal(
        mintEvent[1].args.tokenUri,
        `ipfs://${baseUri}/${fileNames[1]}`,
        'Expected the token URI to match.'
      )
    })
  })
})
