// SPDX-License-Identifier: GPL-3.0-only
pragma solidity 0.8.7;

import {Context} from "@openzeppelin/contracts/utils/Context.sol";
// import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ERC20Basic} from "./tokens/ERC20Basic.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
import "hardhat/console.sol";

contract TokenFactory is Context {
    event TokenCreated(address owner, address tokenAddress);

    // function getBytecode(string memory name, string memory symbol, uint8 decimals, uint256 initialSupply) public pure returns (bytes memory) {
    //     bytes memory bytecode = type(ERC20Basic).creationCode;

    //     return abi.encodePacked(bytecode, abi.encode(name, symbol, decimals, initialSupply));
    // }

    // // 2. Compute the address of the contract to be deployed
    // // NOTE: _salt is a random number used to create an address
    // function getAddress(bytes memory bytecode, uint _salt)
    //     public
    //     view
    //     returns (address)
    // {
    //     bytes32 hash = keccak256(
    //         abi.encodePacked(bytes1(0xff), address(this), _salt, keccak256(bytecode))
    //     );

    //     // NOTE: cast last 20 bytes of hash to address
    //     return address(uint160(uint(hash)));
    // }

    // function create(bytes memory bytecode, uint _salt) external payable {
    //     /*
    //     NOTE: How to call create2

    //     create2(v, p, n, s)
    //     create new contract with code at memory p to p + n
    //     and send v wei
    //     and return the new address
    //     where new address = first 20 bytes of keccak256(0xff + address(this) + s + keccak256(mem[p…(p+n)))
    //           s = big-endian 256-bit value
    //     */
    //    address addr;
    //    address _delagate = _msgSender();
    //     assembly {
    //         addr := delegatecall(150, _delagate, add(bytecode, 32), mload(bytecode), 0, 0)

    //         if iszero(extcodesize(addr)) {
    //             revert(0, 0)
    //         }
    //     }
    //     emit TokenCreated(_msgSender(), addr);
    // }
}
