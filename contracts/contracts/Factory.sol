// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./IRegistery.sol";

contract Factory {
    address public owner;
    IERC20 erc20TokenAddress;
    uint public usedFunds;
    IRegistery public registery;
    event Transfer(address indexed from, address indexed to, uint256 value);

    constructor(address _owner,address _erc20,address _registery) {
        owner = _owner;
        erc20TokenAddress = IERC20(_erc20);
        registery = IRegistery(_registery);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the constituency");
        _;
    }

    function transfer(address _to, uint _amount) public onlyOwner {
        uint size;
        assembly {
            size := extcodesize(_to)
        }
        require(size > 0, "Can't transfer funds to citizens");
        usedFunds += _amount;
        erc20TokenAddress.transfer(_to, _amount);
        emit Transfer(msg.sender, _to, _amount);
    }
}
