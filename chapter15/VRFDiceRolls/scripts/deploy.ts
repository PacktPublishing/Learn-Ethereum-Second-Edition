import { ethers, BigNumber } from "hardhat";

/**
 * run below command to deploy contract
 * npx hardhat run scripts/deploy.ts --network goerli
 */
async function main() {

  const LINK_TOKEN = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";
  const VRF_COORDINATOR = "0x2bce784e69d2Ff36c71edcB9F88358dB0DfB55b4";
  const KEY_HASH = "0x0476f9a745b61ea5c0ab224d3a6e4c99f0b02fce4da01143a4f70aa80ae76e8a";
  const diceRollGame = await ethers.getContractFactory("DiceRollGame");
  // deploy the contract
  const deployedDiceRollGameContract = await diceRollGame.deploy(
    VRF_COORDINATOR,
    LINK_TOKEN,
    KEY_HASH
  );

  await deployedDiceRollGameContract.deployed();
  // print the address of the deployed contract
  console.log("Dice Roll Game Contract Address:",deployedDiceRollGameContract.address);

}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
