// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Constituency {
    address public constituency;
    uint public usedFunds;
    IERC20 erc20TokenAddress;
    event Transfer(address indexed from, address indexed to, uint256 value);
    
    modifier onlyOwner() {
        require(msg.sender == constituency, "You are not the constituency");
        _;
    }

    constructor(address _erc20TokenAddress) {
        constituency = msg.sender;
        erc20TokenAddress = IERC20(_erc20TokenAddress);
    }

    function setConstituencyAddress(address _constAddress) public onlyOwner {
        constituency = _constAddress;
    }

    function setERC20TokenAddress(address _erc20Token) public onlyOwner {
        erc20TokenAddress = IERC20(_erc20Token);
    }

    function transferTo(address _to, uint _amount) public onlyOwner {
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
