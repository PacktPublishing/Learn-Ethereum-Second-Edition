require("@nomiclabs/hardhat-waffle");


extendEnvironment((hre) => {
  const Web3 = require("web3");
  hre.Web3 = Web3;
  // hre.network.provider is an EIP1193-compatible provider.
  hre.web3 = new Web3(hre.network.provider);
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
   defaultNetwork: "hardhat",
   networks: {
     hardhat: {
     }
   },
   solidity: {
     compilers: [
       {
         version: "0.8.9",
         settings: {
           optimizer: {
             enabled: true,
             runs: 300,
           },
         },
       }
     ]
   },
   paths: {
     sources: "./contracts",
     tests: "./tests",
     cache: "./cache",
     artifacts: "./artifacts"
   },
   mocha: {
     timeout: 40000
   },
};
