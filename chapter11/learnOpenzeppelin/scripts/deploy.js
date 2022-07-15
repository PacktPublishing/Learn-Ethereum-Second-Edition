// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');
  const [deployer, payee1, payee2] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // We get the SampleToken contract to deploy
  const SampleToken = await hre.ethers.getContractFactory("SampleToken");
  const sampleToken = await SampleToken.deploy();

  await sampleToken.deployed();

  console.log("SampleToken deployed to:", sampleToken.address);

  // We get the Organizaion contract to deploy

  const Organizaion = await hre.ethers.getContractFactory("Organizaion");
  const organizaion = await Organizaion.deploy(deployer.address);

  await organizaion.deployed();

  console.log("Organizaion deployed to:", organizaion.address);

  // We get the GameToken contract to deploy

  const GameToken = await hre.ethers.getContractFactory("GameToken");
  let payees = [payee1.address, payee2.address ];
  let shares = [70, 30 ];
  let price = 1000000;
  const gameToken = await GameToken.deploy(payees, shares, price);
  
  await gameToken.deployed();
  
  console.log("GameToken deployed to:", gameToken.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
