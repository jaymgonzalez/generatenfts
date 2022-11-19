const { assert, expect } = require('chai')
const { network, deployments, ethers } = require('hardhat')
const { developmentChains, networkConfig } = require('../helper-hardhat-config')
require('dotenv').config()

const POLYGON_MUMBAI_LINK_ADDRESS =
  process.env.POLYGON_MUMBAI_LINK_ADDRESS || ''

!developmentChains.includes(network.name)
  ? describe.skip
  : describe('AINFTs Unit Tests', function () {
      let AINFT, contract
      beforeEach(async function () {
        AINFT = await ethers.getContractFactory('AINFTs')
        ;[owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners()
        contract = await AINFT.deploy()
      })

      describe('Deployment', function () {
        it('Should set the right owner', async function () {
          expect(await contract.owner.to.equal(owner.address))
        })
      })
    })
