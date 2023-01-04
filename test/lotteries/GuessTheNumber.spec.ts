import { expect } from "chai";
import { ethers } from "hardhat";

const { utils } = ethers;

describe("GuessTheNumber", () => {
  it("Solves the challenge", async () => {
    const contractFactory = await ethers.getContractFactory("GuessTheNumber")
    const value = utils.parseEther("1")
    const contract = await contractFactory.deploy({value})
    await contract.deployed()

    const tx = await contract.guess(42, {value})
    await tx.wait;

    expect(await contract.isComplete()).to.be.true;
  });
});