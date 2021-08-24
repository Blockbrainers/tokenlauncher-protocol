// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Basic is ERC20 {
    uint8 private _decimals;

    constructor(
        address tokenOwner,
        string memory name,
        string memory symbol,
        uint8 decimals_,
        uint256 initialSupply
    ) ERC20(name, symbol) {
        _decimals = decimals_;
        _mint(tokenOwner, initialSupply);
    }

    function decimals() public view override returns (uint8) {
        return _decimals;
    }
}
