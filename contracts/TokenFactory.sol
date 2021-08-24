// SPDX-License-Identifier: GPL-3.0-only
pragma solidity 0.8.7;

import {Context} from "@openzeppelin/contracts/utils/Context.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ERC20Basic} from "./tokens/ERC20Basic.sol";

contract TokenFactory is Context {
    event TokenCreated(address owner, IERC20 tokenAddress);

    function create(
        string memory name,
        string memory symbol,
        uint8 decimals,
        uint256 initialSupply
    ) external payable {
        IERC20 token = new ERC20Basic(_msgSender(), name, symbol, decimals, initialSupply);
        emit TokenCreated(_msgSender(), token);
    }
}
