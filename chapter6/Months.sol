// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract FourSeasonContract {
    enum Season { Spring, Summer, Autumn, Winter}
    Season season;
    Season constant defaultSeason = Season.Spring;

    function construct() public {
        season = defaultSeason;
    }
    
    function setSeason(uint _value) public {
         season = Season(_value);
    }
    
    function getSeason() public view returns (uint){
         return uint(season);
    }
}
