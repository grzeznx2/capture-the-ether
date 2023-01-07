import { expect } from "chai";
import { ethers,  } from "hardhat";

const { utils, provider } = ethers;

describe("GuessTheRandomNumberChallenge", () => {
  it("Solves the challenge", async () => {
    const contractFactory = await ethers.getContractFactory("GuessTheRandomNumberChallenge");
    const value = utils.parseEther("1")
    const contract = await contractFactory.deploy({value})
    await contract.deployed()

    const answer = await provider.getStorageAt(contract.address, 0)

    const tx = await contract.guess(answer, { value: utils.parseEther("1") });
    await tx.wait();

    expect(await contract.isComplete()).to.be.true;
  });
});