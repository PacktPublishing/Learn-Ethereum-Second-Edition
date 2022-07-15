const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");

describe("GameToken", function () {
  it("Should return royalty fee once release", async function () {
    const [sender, payee1, payee2] = await ethers.getSigners();
    const provider = waffle.provider;
    const GameToken = await ethers.getContractFactory("GameToken");
    const payee1ETHBefore = await provider.getBalance(payee1.address);
    const payee2ETHBefore = await provider.getBalance(payee2.address);
    let payees = [payee1.address, payee2.address ];
    let shares = [70, 30 ];
    let price = 1000000;
    const gameToken = await GameToken.deploy(payees, shares, price);
    const value = web3.utils.toWei('1', 'ether')
    await gameToken.connect(sender).splitPayments({ value: value })
    /**
     * release payee1's royalty fee
     */
    await gameToken.release(payee1.address)
    const payee1ETHAfter = await provider.getBalance(payee1.address);
    let payee2ETHAfter = await provider.getBalance(payee2.address);
    /**
     * expect payee1 balance get paid for royalty fee
     */
    expect((payee1ETHAfter -payee1ETHBefore)>0).to.be.true
    /**
     * expect payee2 balance is the same 
    */
    expect((payee2ETHAfter -payee2ETHBefore)==0).to.be.true
    /**
     * release payee2's royalty 
     */
    await gameToken.release(payee2.address)
    payee2ETHAfter = await provider.getBalance(payee2.address);
    /**
     * expect payee2 balance get paid for royalty  fee
     */
    expect((payee2ETHAfter - payee2ETHBefore)>0).to.be.true

  });
});
