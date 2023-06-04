// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Contractor {
  string name;
  constructor(){
    name="Aryan Contractor";
  }  
  function getContractorName() public view returns (string memory) {
    return name;
  }
}
