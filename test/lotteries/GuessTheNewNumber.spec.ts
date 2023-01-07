import { expect } from "chai";
import { ethers } from "hardhat";

const { utils } = ethers;

describe("GuessTheNewNumberChallenge", () => {
  it("Solves the challenge", async () => {
    const value = utils.parseEther("1")
    const [deployer,attacker] = await ethers.getSigners()
    const contractFactory = await ethers.getContractFactory("GuessTheNewNumberChallenge")
    const contract = await contractFactory.connect(deployer).deploy({value})
    await contract.deployed()

    const attackerContractFactory = await ethers.getContractFactory("GuessTheNewNumberChallengeAttacker")
    const attackerContract = await attackerContractFactory.connect(attacker).deploy(contract.address)
    await attackerContract.deployed()

    const attackTx = await attackerContract.attack({value})
    await attackTx.wait;

    expect(await contract.isComplete()).to.be.true;
  });
});