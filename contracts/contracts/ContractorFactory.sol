// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ContractorFactory {
    string public name;
    string public description;
    uint public usedFunds;
    constructor(string memory _name,string memory _description) {
        name = _name;
        description = _description;
    }
}