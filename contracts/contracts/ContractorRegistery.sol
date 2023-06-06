// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./ContractorFactory.sol";
import "./Registery.sol";

contract ContractorRegistery is Registery{
    
    constructor(address _erc20Token) Registery(_erc20Token,msg.sender,address(0)){}

    function addNewContractor(string memory _name,string memory _description) onlyOwner public {
        ContractorFactory contractorFactory = new ContractorFactory(_name,_description);
        super.addNewRegistery(address(contractorFactory));
    }
}