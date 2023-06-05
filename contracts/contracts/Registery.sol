// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ConstituencyFactory{
    address public constituency;
    uint public usedFunds;
    IERC20 erc20TokenAddress;
    string constituencyName;
    event Transfer(address indexed from, address indexed to, uint256 value);
    
    modifier onlyOwner() {
        require(msg.sender == constituency, "You are not the constituency");
        _;
    }

    constructor(address _erc20TokenAddress, address _owner,string memory _constituencyName) {
        constituency = _owner;
        erc20TokenAddress = IERC20(_erc20TokenAddress);
        constituencyName = _constituencyName;
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

contract Registery{
    address[] public constituencies;
    address public owner;
    address public erc20Token;
    mapping (address => address) userConstituencies;
    mapping (address => bool) isValidConstiuencies;
    
    constructor(address _erc20Token){
        owner = msg.sender;
        erc20Token = _erc20Token;
    }
    modifier onlyOwner() {
        require(msg.sender == owner, "You don't have authority");
        _;
    }

    function addNewConstituency(string memory _name) onlyOwner public {
        ConstituencyFactory constituency = new ConstituencyFactory(erc20Token,msg.sender,_name);
        constituencies.push(address(constituency));
        userConstituencies[msg.sender] = address(constituency);
        isValidConstiuencies[address(constituency)] = true;
    }
    function getConstituency(address _user) public view returns (address) {
        return userConstituencies[_user];
    }
    function isValidConstiuency(address _contituency) public view returns (bool) {
        return isValidConstiuencies[_contituency];
    }
}