// SPDX-License-Identifier: GPL-3.0-only
pragma solidity 0.8.7;


interface ICashier {

    event Receipt(address sender, string serviceName, uint256 amount);

    function pay(string memory serviceName) external payable;

    function getPrice(string memory serviceName) external view returns (uint256);

    function setPrice(string memory serviceName, uint256 price) external;

    function withdraw(uint256 amount) external;
}
