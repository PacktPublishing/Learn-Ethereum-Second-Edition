
import { ethers } from "hardhat";

const diceRollGameContract = require("../artifacts/contracts/DiceRollGame.sol/DiceRollGame.json");
//Make sure replace the below address with yours. 
const diceRollGameContractAddress="your deployed dice RollGame Contract Address";
/**
 * run below command to call rollDice function
 * npx hardhat run scripts/diceRollGameCall.ts --network goerli
 */
async function main() {
    const DiceRollGameContract = await ethers.getContractFactory("DiceRollGame");
    const diceRollGame = await DiceRollGameContract.attach(diceRollGameContractAddress)
    console.log("Dice Roll Game Contract:", diceRollGame.address);
    await diceRollGame.getRandomNumber()
    // Wait for 60 second for random number to change.
    console.log("Sleeping... 180 sec)");
    await sleep(180000);
    const diceNum =  await diceRollGame.rollDice();
    console.log("Dice Roll Game Contract rollDice:", diceNum.toNumber());
}
function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
main();