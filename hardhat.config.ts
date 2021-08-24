// require('solidity-coverage')
import 'hardhat-gas-reporter'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import '@nomiclabs/hardhat-etherscan'
import { HardhatUserConfig } from 'hardhat/types/config'

require('dotenv').config()
const mnemonic = process.env.DEV_MNEMONIC || ''

export enum TokenFactoryNetwork {
  HARDHAT = 'hardhat',
  RINKEBY = 'rinkeby',
  MAINNET = 'mainnet',
  BSC_MAINNET = 'bsc-mainnet',
  BSC_TESTNET = 'bsc-testnet',
  KCC_MAINNET = 'kcc-mainnet',
  KCC_TESTNET = 'kcc-testnet',
}

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.8.6',
        settings: {
          evmVersion: 'istanbul',
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
    ],
  },
  networks: {
    [TokenFactoryNetwork.HARDHAT]: {
      forking: {
        url: 'https://bsc-dataseed.binance.org/',
      },
      accounts: {
        accountsBalance: '10000000000000000000000',
      },
    },
    [TokenFactoryNetwork.BSC_MAINNET]: {
      url: 'https://bsc-dataseed.binance.org/',
      chainId: 56,
      accounts: {
        mnemonic,
      },
      // gasPrice: 9000000000
    },
    [TokenFactoryNetwork.BSC_TESTNET]: {
      // Faucet: https://testnet.binance.org/faucet-smart
      url: 'https://data-seed-prebsc-1-s1.binance.org:8545',
      chainId: 97,
      accounts: {
        mnemonic,
      },
    },
    [TokenFactoryNetwork.KCC_MAINNET]: {
      url: 'https://rpc-mainnet.kcc.network',
      chainId: 321,
      accounts: {
        mnemonic,
      },
    },
    [TokenFactoryNetwork.KCC_TESTNET]: {
      // Faucet: https://faucet-testnet.kcc.network/
      url: 'https://rpc-testnet.kcc.network',
      chainId: 322,
      accounts: {
        mnemonic,
      },
    },
    [TokenFactoryNetwork.RINKEBY]: {
      url: 'https://rinkeby.infura.io/v3/' + process.env.INFURA_ID,
      accounts: {
        mnemonic,
      },
    },
    [TokenFactoryNetwork.MAINNET]: {
      url: 'https://mainnet.infura.io/v3/' + process.env.INFURA_ID,
      accounts: {
        mnemonic,
      },
    },
  },
  mocha: {
    timeout: 99999999,
  },
  etherscan: {
    apiKey: process.env.BSCCAN_APIKEY,
  },
  // gasReporter: {
  //   currency: 'USD',
  //   gasPrice: 21,
  //   coinmarketcap: process.env.COINMARKETCAP_APIKEY,
  // },
}

export default config
