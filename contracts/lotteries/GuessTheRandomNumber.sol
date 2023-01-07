pragma solidity ^0.4.21;

contract GuessTheRandomNumberChallenge {
    uint8 answer;
    bytes32 public blockHash;

    function GuessTheRandomNumberChallenge() public payable {
        require(msg.value == 1 ether);
        blockHash = block.blockhash(block.number);
        answer = uint8(keccak256(block.blockhash(block.number - 1), now));
    }

    function getBlockHash() external view returns(bytes32){
        return blockHash;
    }

    function isComplete() public view returns (bool) {
        return address(this).balance == 0;
    }

    function guess(uint8 n) public payable {
        require(msg.value == 1 ether);

        if (n == answer) {
            msg.sender.transfer(2 ether);
        }
    }
}