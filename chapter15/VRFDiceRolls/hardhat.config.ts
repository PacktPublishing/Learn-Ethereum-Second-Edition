import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

//enter your own keys
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY_URL;
const PRIVATE_KEY = process.env.MUMBAI_PRIVATE_KEY;

const config: HardhatUserConfig = {
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [PRIVATE_KEY]
    },

  },
  solidity: "0.8.17",
};

export default config;
