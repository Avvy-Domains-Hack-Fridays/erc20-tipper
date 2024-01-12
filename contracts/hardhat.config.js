require("@nomiclabs/hardhat-waffle");
require('hardhat-deploy')
require('hardhat-deploy-ethers')
require('@nomiclabs/hardhat-etherscan')


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  mocha: {
    timeout: 60000,
  },
  namedAccounts: {
    deployer: 0
  },
  etherscan: {
    apiKey: {
      avascan: "avascan",
      snowtrace: process.env.SNOWTRACE_API_KEY
    },
    customChains: [
      {
        network: "avascan",
        chainId: 43114,
        urls: {
          apiURL: "https://api.avascan.info/v2/network/mainnet/evm/43114/etherscan",
          browserURL: "https://avascan.info/blockchain/c",
        }
      },
      {
        network: "snowtrace",
        chainId: 43114,
        urls: {
          apiURL: "https://api.snowtrace.io/api",
          browserURL: "https://snowtrace.io"
        }
      }
    ],
  },
  networks: {
    fuji: {
      url: 'https://api.avax-test.network/ext/bc/C/rpc',
      chainId: 43113,
      accounts: [
        process.env.PRIVKEY
      ]
    },
    mainnet: {
      url: 'https://api.avax.network/ext/bc/C/rpc',
      chainId: 43114,
      accounts: [
        process.env.PRIVKEY
      ]
    },
    avascan: {
      url: 'https://api.avax.network/ext/bc/C/rpc',
      chainId: 43114,
    },
    snowtrace: {
      url: 'https://api.avax.network/ext/bc/C/rpc',
      chainId: 43114,
    },
  }
};
