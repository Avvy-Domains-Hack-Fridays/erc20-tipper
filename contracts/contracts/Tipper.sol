// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Tipper {
  struct Tip {
    address token;
    uint amount;
    address payer;
    address payee;
    string note;
    string image;
  }
  mapping(uint => Tip) public tips;
  uint public lastTipId;

  function tip(
    address tokenAddress,
    uint amount,
    address payee,
    string memory note,
    string memory image
  ) public {
    ERC20 token = ERC20(tokenAddress);
    uint256 allowance = token.allowance(msg.sender, address(this));
    require(allowance >= amount, "Tipper: transfer amount not approved");
    require(token.transferFrom(msg.sender, payee, amount), "Tipper: transfer failed");
    lastTipId++;
    tips[lastTipId] = Tip(tokenAddress, amount, msg.sender, payee, note, image);
  }
}
