// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

// @author Brian
// @Title: learn Ethereum 2nd Edition ChainLink VRF
contract DiceRollGame is VRFConsumerBase {
    //Chainlink variables
   // The amount of LINK to send with the request
   uint256 internal immutable fee;
   // ID of public key against which randomness is generated
   bytes32 public keyHash;
   uint256 public randomResult;
   /**
   * constructor inherits a VRFConsumerBase and initiates the values for keyHash, fee and gameStarted
   * @param vrfCoordinator address of VRFCoordinator contract
   * @param linkToken address of LINK token contract
   * @param vrfKeyHash ID of public key against which randomness is generated
   */
    constructor(address vrfCoordinator, address linkToken, bytes32 vrfKeyHash)
    VRFConsumerBase(vrfCoordinator, linkToken) {
        keyHash = vrfKeyHash;
        //vrfFee the amount of LINK to send with the request
        fee = 0.1 * 10 ** 18;
    }
  /**
   * getRandomNumber function check contract has enough LINK balance to execute VRFCoordinator request for randomness

   */
  function getRandomNumber() public returns (bytes32 requestId) {
    require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK - fill contract with faucet");
    return requestRandomness(keyHash, fee);
  }

  /**
    * fulfillRandomness is Callback function by VRF Coordinator when it receives a valid VRF proof.
    * This function is overrided to use the random number generated by Chainlink VRF for different use cases.
    * @param requestId  this ID is unique for the request we sent to the VRF Coordinator
    * @param randomness this is a random unit256 generated and returned to us by the VRF Coordinator
   */
  function fulfillRandomness(bytes32 requestId, uint256 randomness) 
    internal override {
     randomResult = randomness;
  }
  /**
   * rollDice function generate dice number based on returned chainlink VRF value by mod 6
   */
  function rollDice() public view returns (uint256) {
        require(randomResult > 0, "Random number has not yet been obtained");
        return (randomResult % 6) + 1;
  }
}