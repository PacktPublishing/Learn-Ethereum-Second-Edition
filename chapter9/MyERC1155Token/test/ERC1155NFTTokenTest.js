const { ethers } = require("hardhat");
const { expect } = require("chai");
const {BigNumber} = require("ethers");

const initialURI = 'https://ipfs.io/ipfs/bafybeifcatfkx7jehcieim4ujuf6rin7jqcqjkqwdvtra3stpndgmznydm/{id}.json';
describe("ERC1155NFTTokenUT", function () {
   async function setup() {
        const [owner ] = await ethers.getSigners();
        const ERC1155NFTToken = await ethers.getContractFactory("ERC1155NFTToken");
        const erc1155NFTToken = await ERC1155NFTToken.deploy();
        return {owner, erc1155NFTToken };
    }
    describe("ERC1155NFTToken NFT", function () {
        it('should get balanceOf token amount for seven NFT tokens by token Id', async () => {
            const { owner, erc1155NFTToken} = await setup();
            expect(await erc1155NFTToken.balanceOf(owner.address, 0)).to.equal(BigNumber.from(10));
            expect(await erc1155NFTToken.balanceOf(owner.address, 1)).to.equal(BigNumber.from(10));
            expect(await erc1155NFTToken.balanceOf(owner.address, 2)).to.equal(BigNumber.from(10));
            expect(await erc1155NFTToken.balanceOf(owner.address, 3)).to.equal(BigNumber.from(10));
            expect(await erc1155NFTToken.balanceOf(owner.address, 4)).to.equal(BigNumber.from(10));
            expect(await erc1155NFTToken.balanceOf(owner.address, 5)).to.equal(BigNumber.from(10));
            expect(await erc1155NFTToken.balanceOf(owner.address, 6)).to.equal(BigNumber.from(10));
      });
      it('should get balanceOfBatch token amount for seven NFT tokens by token Id', async function () {
        const { owner, erc1155NFTToken} = await setup();
        const ownerBatchBalances = await erc1155NFTToken.balanceOfBatch(
            [owner.address, owner.address, owner.address, owner.address, owner.address, owner.address, owner.address],
          [0, 1, 2, 3, 4, 5, 6 ]
        );
        for (let i = 0; i < ownerBatchBalances.length; i++) {
          expect(ownerBatchBalances[i]).to.equal(BigNumber.from(10));
        }
      });
      it('ERC1155NFTToken Metadata URI Test', async function () {
        const { owner, erc1155NFTToken} = await setup();
        expect(await erc1155NFTToken.uri(0)).to.be.equal(initialURI);
        expect(await erc1155NFTToken.uri(1)).to.be.equal(initialURI);
        expect(await erc1155NFTToken.uri(2)).to.be.equal(initialURI);
        expect(await erc1155NFTToken.uri(3)).to.be.equal(initialURI);
        expect(await erc1155NFTToken.uri(4)).to.be.equal(initialURI);
        expect(await erc1155NFTToken.uri(5)).to.be.equal(initialURI);
        expect(await erc1155NFTToken.uri(6)).to.be.equal(initialURI);
      });
    });
});
