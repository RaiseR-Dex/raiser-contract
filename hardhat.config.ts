import { HardhatUserConfig } from 'hardhat/config';
import "@openzeppelin/hardhat-upgrades";
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-ethers';
import 'hardhat-typechain';
import 'hardhat-deploy';
import "@nomiclabs/hardhat-etherscan";
import "hardhat-gas-reporter";
import * as dotenv from 'dotenv';
import  { PATH
        } from './scripts/const.ts';

let path = PATH;
dotenv.config({ path });

// You have to export an object to set up your config
// This object can have the following optional entries:
// defaultNetwork, networks, solc, and paths.
// Go to https://buidler.dev/config/ to learn more
const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
    },
    mainnet: {
      url: process.env.RPC_ENDPOINT,
      accounts: [process.env.KEY],
    },
    eth: {
      url: process.env.RPC_ENDPOINT,
      accounts: [process.env.KEY],
    },
    ethsepolia: {
      url: process.env.RPC_ENDPOINT,
      accounts: [process.env.KEY]
    },
    ethgoerli: {
      url: process.env.RPC_ENDPOINT,
      accounts: [process.env.KEY]
    },
    arbitrum: {
      url: process.env.RPC_ENDPOINT,
    },
    arbigoerli: {
      url: process.env.RPC_ENDPOINT,
      accounts: [process.env.KEY],
    },
    polygon: {
      url: process.env.RPC_ENDPOINT,
      accounts: [process.env.KEY],
    },
    mumbai: {
      url: process.env.RPC_ENDPOINT,
      accounts: [process.env.KEY],
    }   
  },
  solidity: {
    compilers: [
      {
        version: '0.8.17',
        settings: {
          optimizer: {
            enabled: true,
          },
        },
      },
    ],
  },
  paths: {
    sources: "./contracts",
    tests: "./tests",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 20000
  },
  etherscan: {
    apiKey: process.env.API_KEY,
    customChains: [],
  }
};

export default config;