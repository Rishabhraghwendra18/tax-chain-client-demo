// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./Factory.sol";
import "./IRegistery.sol";

contract ContractFactory is Factory {
    string public name;
    string public contractDescription;

    constructor(address _owner,address _erc20,string memory _name,string memory _description,address _registery) Factory(msg.sender,_erc20,_registery) {
        name = _name;
        owner = _owner;
        contractDescription = _description;
        registery = IRegistery(_registery);
        // contractRegistery = IContractRegistery(_registery);
    }

    function transferTo(address _to, uint _amount) public onlyOwner {
        require(registery.isValidRegistry(_to),"Not a valid Contractor");
        super.transfer(_to,_amount);
    }
}
