require("dotenv").config();
const { ethers } = require("ethers");
const HDWalletProvider = require("@truffle/hdwallet-provider");

const infuraUri = `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`;
const infuraTestnetUri = `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`;
const privKey = process.env.PRIVATE_KEY || "";
const etherscanApiKey = process.env.ETHERSCAN_API_KEY || "";

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
      gasPrice: ethers.utils.parseUnits("33", "gwei").toString(),
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
    etherscan: etherscanApiKey,
  },
  compilers: {
    solc: {
      version: "0.6.12",
    },
  },
};
