require("dotenv").config();
const { ethers } = require("ethers");
const HDWalletProvider = require("@truffle/hdwallet-provider");

const infuraUri = process.env.INFURA_URI || "";
const infuraTestnetUri = process.env.INFURA_TESTNET_URI || "";
const privKey = process.env.PRIVATE_KEY || "";

module.exports = {
  networks: {
    mainnet: {
      networkCheckTimeout: 10000,
      provider: () => new HDWalletProvider(privKey, infuraUri),
      network_id: 1,
      gasPrice: ethers.utils.parseUnits("50", "gwei").toString(),
      gas: 6000000,
      timeoutBlocks: 200,
    },
    testnet: {
      networkCheckTimeout: 10000,
      provider: () => new HDWalletProvider(privKey, infuraTestnetUri),
      network_id: 4, // rinkeby
      gasPrice: ethers.utils.parseUnits("70", "gwei").toString(),
      gas: 6000000,
    },
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    mainnetFork: {
      host: "127.0.0.1",
      port: 8545,
      network_id: 1,
      skipDryRun: true,
    },
  },
  plugins: ["truffle-plugin-verify"],
  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY,
  },
  compilers: {
    solc: {
      version: "0.6.12",
    },
  },
};
