import { expect } from "chai";
import { ethers } from "hardhat";

const { utils } = ethers;

describe("TokenSaleChallenge", () => {
  it("Solves the challenge", async () => {
    const myAddress = ethers.provider.getSigner().getAddress();
    const challengeFactory = await ethers.getContractFactory("TokenSaleChallenge");
    const challengeContract = await challengeFactory.deploy(myAddress, {
      value: utils.parseEther("1"),
    });
    await challengeContract.deployed();

    // expect(await challengeContract.isComplete()).to.be.true;
  });
});