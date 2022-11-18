const { assert, expect } = require('chai')
const { network, deployments, ethers } = require('hardhat')
const {
  developmentChains,
  networkConfig,
} = require('../../helper-hardhat-config')
require('dotenv').config()

const POLYGON_MUMBAI_LINK_ADDRESS =
  process.env.POLYGON_MUMBAI_LINK_ADDRESS || ''

!developmentChains.includes(network.name)
  ? describe.skip
  : describe('AINFTs Unit Tests', function () {
      let
    })
