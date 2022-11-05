// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
import "remix_tests.sol"; // this import is automatically injected by Remix.
import "hardhat/console.sol";
import "remix_accounts.sol";
import "../contracts/MyERC20Token.sol";

contract MyERC20TokenTest {

    address acct0;
    address acct1;
    MyERC20Token myERC20TokenToTest;
    function beforeAll () public {
        acct0 = TestsAccounts.getAccount(0); 
        acct1 = TestsAccounts.getAccount(1); 
        myERC20TokenToTest = new MyERC20Token('MyERC20Token', 'MTK', acct0, 100000000000000000000);
    }

    function checkTotalSupply() public {
        console.log("check total supply");
        Assert.equal(myERC20TokenToTest.totalSupply(), uint(100000000000000000000), "total supply is wrong");
    }
    function checkBalanceOf() public {
        console.log("check Token BalanceOf");
        Assert.equal(myERC20TokenToTest.balanceOf(acct0), uint(100000000000000000000), "balanceOf number is wrong");
    }
    function checkIsWhitelist() public {
        console.log("check isWhitelist");
        Assert.equal(myERC20TokenToTest.isWhitelist(acct0), true, "initial account is whitelisted");
    }
    function checkValidateTransferRestricted() public {
        console.log("check validateTransferRestricted");
        Assert.equal(myERC20TokenToTest.validateTransferRestricted(acct0), 0, "initial account is not restricted");
        Assert.equal(myERC20TokenToTest.validateTransferRestricted(acct1), 1, "Second account is restricted before whileListed");
        myERC20TokenToTest.addWhitelist(acct1);
        Assert.equal(myERC20TokenToTest.validateTransferRestricted(acct1), 0, "Second account is not restricted");
    }
     
}