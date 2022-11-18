const { ethers } = require('hardhat')

const networkConfig = {
  default: {
    name: 'hardhat',
    keepersUpdateInterval: '30',
  },
  31337: {
    name: 'localhost',
  },
  5: {
    name: 'goerli',
  },
  8001: {
    name: 'mumbai',
  },
  1: {
    name: 'mainnet',
    keepersUpdateInterval: '30',
  },
}

const developmentChains = ['hardhat', 'localhost']

module.exports = {
  networkConfig,
  developmentChains,
}
