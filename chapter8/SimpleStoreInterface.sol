// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4.0;
/**
 *@notice smart contract for SimpleStoreInterface
 * @ Learn Ethereum 2nd Edition
 * @author brian wu
 */ 
contract SimpleStoreInterface {
   function getValue() external view returns (uint256);
}