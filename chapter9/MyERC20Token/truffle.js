module.exports = {

  networks: {
    development: {
      host: "127.0.0.1",
      // port: 8545, //ganache
      port: 9545,  //use truffle only
      network_id: "*" // Match any network id
    }
  },
  compilers: {
    solc: {
       version: "0.8.4"
    }
  }
};
