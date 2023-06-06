// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./Registery.sol";
import "./Factory.sol";

contract ConstituencyFactory is Factory{
    string public constituencyName;

    constructor(address _erc20TokenAddress, address _owner,string memory _constituencyName,address _registery) Factory(_owner,_erc20TokenAddress,_registery){
        constituencyName = _constituencyName;
    }

    function transferTo(address _to, uint _amount) public onlyOwner {
        require(registery.isValidRegistry(_to),"Not a valid contract");
        super.transfer(_to,_amount);
    }
}

contract ConstituencyRegistery is Registery{
    constructor(address _erc20Token,address _registery) Registery(_erc20Token,msg.sender,_registery){}

    function addNewConstituency(string memory _name) onlyOwner public {
        ConstituencyFactory constituency = new ConstituencyFactory(address(erc20Token),msg.sender,_name,address(registery));
        super.addNewRegistery(address(constituency));
    }
}