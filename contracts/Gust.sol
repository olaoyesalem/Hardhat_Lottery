// SPDX-License-Identifier: MIT

pragma solidity ^0.8.5;

import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


/**
    @title  GU$T Contract
    @author olaoye Salem
    @notice This Contract deploys GU$T as Gipper Labs  Token used  and allow only the owner to call _mint function
    This contract also implements the EIP 2612 permit , already ERC20 permit, which grant permission to others to spend their tokens in a single transaction.
    @dev This contract inherits most of the functions from openzeppelin
*/


contract GustToken is ERC20Permit, Ownable {

    bytes32 public constant PERMIT_TYPEHASH = keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");

    constructor() ERC20("GusT", "GU$T") ERC20Permit("GustToken") {
       
    }

    function mint(address to, uint256 _amount) public onlyOwner {
        uint256 amount = _amount * 10**decimals();   
        _mint(to, amount);
    }
}
