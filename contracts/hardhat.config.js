require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
const SEPOLIA_NODE=process.env.SEPOLIA_NODE;
const PRIVATE_KEY=process.env.PRIVATE_KEY;
const ETHERSCAN_API = process.env.ETHERSCAN_API;
module.exports = {
  solidity: "0.8.18",
  etherscan: {
    apiKey: ETHERSCAN_API,
  },
  networks:{
    sepolia: {
      url: SEPOLIA_NODE,
      accounts: [PRIVATE_KEY]
    }
  }
};
