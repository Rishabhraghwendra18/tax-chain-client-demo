// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ContractFactory.sol";
import "./Registery.sol";

contract ContractRegistery is Registery{
    
    constructor(address _erc20Token, address _registery) Registery(_erc20Token,msg.sender,_registery){}
    function addNewContract(string memory _name,string memory _description) onlyOwner public {
        ContractFactory contractFactory = new ContractFactory(msg.sender,address(erc20Token),_name,_description,address(registery));
        super.addNewRegistery(address(contractFactory));
    }
}