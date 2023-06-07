// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./IRegistery.sol";

contract Registery{
    address[] public registeriesAddress;
    address public owner;
    IERC20 public erc20Token;
    IRegistery public registery;
    mapping (address => address) userRegistery;
    mapping (address => bool) isValidRegistries;
    
    constructor(address _erc20Token,address _owner,address _registery){
        owner = _owner;
        erc20Token = IERC20(_erc20Token);
        registery = IRegistery(_registery);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You don't have authority");
        _;
    }
    
    function setRegistery(address _registery) public onlyOwner{
        registery = IRegistery(_registery);
    }
    function setNewOwner(address _user) onlyOwner public {
        owner = _user;
    }

    function addNewRegistery(address _registery) onlyOwner public {
        // ConstituencyFactory constituency = new ConstituencyFactory(erc20Token,msg.sender,_name);
        registeriesAddress.push(_registery);
        userRegistery[msg.sender] = _registery;
        isValidRegistries[_registery] = true;
    }
    function getAllRegisteries() public view returns (address[] memory) {
        return registeriesAddress;
    }
    function getRegistery(address _user) public view returns (address) {
        return userRegistery[_user];
    }
    function isValidRegistry(address _registery) public view returns (bool) {
        return isValidRegistries[_registery];
    }
}