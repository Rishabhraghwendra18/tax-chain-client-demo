// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./IRegistery.sol";

contract Govt {
    address public govtAddress;
    uint public usedFunds;
    IERC20 erc20TokenAddress;
    IRegistery registery;
    event Transfer(address indexed from, address indexed to, uint256 value);

    modifier onlyOwner() {
        require(msg.sender == govtAddress, "You are not the govt");
        _;
    }

    constructor(address _erc20TokenAddress,address _registery) {
        govtAddress = msg.sender;
        erc20TokenAddress = IERC20(_erc20TokenAddress);
        registery = IRegistery(_registery);
    }

    function setGovtAddress(address _govtAddress) public onlyOwner {
        govtAddress = _govtAddress;
    }

    function setERC20TokenAddress(address _erc20Token) public onlyOwner {
        erc20TokenAddress = IERC20(_erc20Token);
    }

    function transferTo(address _to, uint _amount) public onlyOwner {
        require(registery.isValidRegistry(_to),"Not a valid constituency");
        uint size;
        assembly {
            size := extcodesize(_to)
        }
        require(size > 0, "Can't transfer funds to citizens");
        usedFunds += _amount;
        erc20TokenAddress.transfer(_to, _amount);
        emit Transfer(msg.sender,_to,_amount);
    }
}
