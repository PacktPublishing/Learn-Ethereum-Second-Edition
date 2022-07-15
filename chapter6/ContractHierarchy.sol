// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract A {
}

contract B is A {
}

contract C is A {
}

contract D is B, C {
}

contract E is A, B{
}

//contract F is B, A { This won't compile
//}

contract G {
    function isGood() virtual  public returns (bool) {
        return false;
    }
}

contract H is G {
    function isGood() pure public  override(G) returns (bool) {
        return true;
    }
}

contract I is G {
}
