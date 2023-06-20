// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BkdTask {
    string public name;
    string public symbol;
    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;
    mapping(address => bool) public hasReceivedTokens;
    uint256 public constant MAX_FAUCET_TOKENS = 1000;

    event Transfer(address indexed from, address indexed to, uint256 value);

    constructor(string memory _name, string memory _symbol, uint256 _totalSupply) {
        name = _name;
        symbol = _symbol;
        totalSupply = _totalSupply;
        balanceOf[msg.sender] = _totalSupply;
    }

    function faucet() public {
        require(!hasReceivedTokens[msg.sender], "You have already received tokens from the faucet");
        hasReceivedTokens[msg.sender] = true;

        require(balanceOf[msg.sender] >= MAX_FAUCET_TOKENS, "Insufficient balance for faucet");
        balanceOf[msg.sender] -= MAX_FAUCET_TOKENS;
        balanceOf[msg.sender] += MAX_FAUCET_TOKENS;
        emit Transfer(address(this), msg.sender, MAX_FAUCET_TOKENS);
    }

    function transfer(address _to) public {
    uint256 _value = 1000;

    require(_to != address(0), "Invalid recipient address");
    require(balanceOf[msg.sender] >= _value, "Insufficient balance");

    balanceOf[msg.sender] -= _value;
    balanceOf[_to] += _value;
    emit Transfer(msg.sender, _to, _value);
}

}
