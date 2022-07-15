// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/finance/PaymentSplitter.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @GameToken use openzeppelin PaymentSplitter for royalty fee split
/// @author brian

contract GameToken is ERC721, Ownable {

    PaymentSplitter private _splitter;
    uint256 public price;
    
    constructor(
        address[] memory payees, 
        uint256[] memory shares,
        uint256 _price
    ) ERC721("GameToken", "GT")
    {
        _splitter = new PaymentSplitter(payees, shares);
        price = _price;
    }
    function release(address payable account) external {
        _splitter.release(account);
    }
    function splitPayments() public payable onlyOwner {
        (bool success, ) = payable(_splitter).call{value: address(this).balance}(
        ""
        );
        require(success);
    }
}