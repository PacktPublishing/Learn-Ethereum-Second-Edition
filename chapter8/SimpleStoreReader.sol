// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4.0;
/**
 *@notice smart contract for SimpleStoreReader
 * @ Learn Ethereum 2nd Edition
 * @author brian wu
 */ 
import “./SimpleStoreInterface.sol”;
contract SimpleStoreReader {
  function getValue(address simpleStore) 
    external view returns (uint256) {
    return SimpleStoreInterface(simpleStore).getValue();
  }
}