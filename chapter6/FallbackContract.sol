// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;


/** @title Fallback HelloWorld contract. */
contract FallbackHelloWorld {
    
    // the greeting variable
    string greeting;

    fallback() external {
        greeting = 'Alternate message from Learn Ethereum';
    }
} 


// The Rent contract keeps all payments it received;
contract Rent {
    fallback() external payable { }
}


