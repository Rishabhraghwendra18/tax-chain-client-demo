// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IRegistery {
    function isValidRegistry(address _registery) external view returns (bool);
}