// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4.0;
/**
 *@notice smart contract for Selector and calculate IERC1155 InterfaceId
 * @ Learn Ethereum 2nd Edition
 * @author brian wu
 */ 
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
contract Selector {
    function calcIERC1155InterfaceId() external pure returns (bytes4) {
    IERC1155 i;
    return i.balanceOf.selector ^ i.balanceOfBatch.selector  ^ i.setApprovalForAll.selector  ^ i.isApprovedForAll.selector ^ i.safeTransferFrom.selector ^ i.safeBatchTransferFrom.selector;
  }

}