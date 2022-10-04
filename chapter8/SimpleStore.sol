// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4.0;
/**
 *@notice smart contract for SimpleStore
 * @ Learn Ethereum 2nd Edition
 * @author brian wu
 */ 
contract SimpleStore {
  uint256 internal value;
  function setValue(uint256 _value) external {
    value = _value;
  }
  function getValue() external view returns (uint256) {
    return value;
  }
}