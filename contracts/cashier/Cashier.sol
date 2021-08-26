// SPDX-License-Identifier: GPL-3.0-only
pragma solidity 0.8.7;

import {Context} from "@openzeppelin/contracts/utils/Context.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Cashier is Context, Ownable {

    mapping (bytes32 => uint256) private _prices;

    event Receipt(address sender, string serviceName, uint256 amount);

    function pay(string memory serviceName) public payable {
        require(msg.value == _prices[_toBytes32(serviceName)], "Cashier: wrong price");

        emit Receipt(_msgSender(), serviceName, msg.value);
    }

    function getPrice(string memory serviceName) public view returns (uint256) {
        return _prices[_toBytes32(serviceName)];
    }

    function setPrice(string memory serviceName, uint256 price) public onlyOwner {
        _prices[_toBytes32(serviceName)] = price;
    }

    function withdraw(uint256 amount) public onlyOwner {
        payable(owner()).transfer(amount);
    }

    function _toBytes32(string memory serviceName) private pure returns (bytes32) {
        return keccak256(abi.encode(serviceName));
    }
}
