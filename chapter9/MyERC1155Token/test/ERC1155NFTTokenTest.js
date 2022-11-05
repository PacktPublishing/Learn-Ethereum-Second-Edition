const { expect } = require("chai");
const { ethers } = require("hardhat");
const {BigNumber} = require("ethers");

describe("ERC1155NFTTokenUT", function () {
   async function setup() {
        const [owner ] = await ethers.getSigners();
        const ERC1155NFTToken = await ethers.getContractFactory("ERC1155NFTToken");
        const erc1155NFTToken = await ERC1155NFTToken.deploy();
        return {owner, erc1155NFTToken };
    }
    describe("ERC1155NFTToken NFT", function () {
        it('should get one token amount for all four NFT token owners', async () => {
            const { owner, erc1155NFTToken} = await setup();
            expect(await erc1155NFTToken.balanceOf(owner.address, 0)).to.equal(BigNumber.from(1));
            expect(await erc1155NFTToken.balanceOf(owner.address, 1)).to.equal(BigNumber.from(1));
            expect(await erc1155NFTToken.balanceOf(owner.address, 2)).to.equal(BigNumber.from(1));
            expect(await erc1155NFTToken.balanceOf(owner.address, 3)).to.equal(BigNumber.from(1));
            expect(await erc1155NFTToken.balanceOf(owner.address, 4)).to.equal(BigNumber.from(1));
            expect(await erc1155NFTToken.balanceOf(owner.address, 5)).to.equal(BigNumber.from(1));
            expect(await erc1155NFTToken.balanceOf(owner.address, 6)).to.equal(BigNumber.from(1));
      });
  
    });

});
