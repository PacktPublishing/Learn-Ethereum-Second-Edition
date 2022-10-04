// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4.0;
/**
 *@notice smart contract for The DigitalArt ERC721 Token
 * @ Learn Ethereum 2nd Edition
 * @author brian wu
 */ 

///import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.7.3/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract ERC1155NFTToken  is ERC1155 {
    uint256 public constant MomentOfSilence = 0;
    uint256 public constant Finchwing = 1;
    uint256 public constant GirlAndBird = 2;
    uint256 public constant Kitty = 3;
    uint256 public constant MargayCat = 4;
    uint256 public constant Nighthill = 5;
    uint256 public constant Storm = 6;

    constructor() ERC1155("https://ipfs.io/ipfs/bafybeifcatfkx7jehcieim4ujuf6rin7jqcqjkqwdvtra3stpndgmznydm/{id}.json") {
        _mint(msg.sender, MomentOfSilence, 1, "");
        _mint(msg.sender, Finchwing, 1, "");
        _mint(msg.sender, GirlAndBird, 1, "");
        _mint(msg.sender, Kitty, 1, "");
        _mint(msg.sender, MargayCat, 1, "");
        _mint(msg.sender, Nighthill, 1, "");
        _mint(msg.sender, Storm, 1, "");
    }
}