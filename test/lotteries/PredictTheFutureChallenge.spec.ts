import { expect } from "chai";
import { ethers } from "hardhat";

const { utils, provider } = ethers;

describe("PredictTheFutureChallenge", () => {
  it.only("Solves the challenge", async () => {
    const value = utils.parseEther("1")

    const contractFactory = await ethers.getContractFactory("PredictTheFutureChallenge")
    const exploiterContractFactory = await ethers.getContractFactory("PredictTheFutureChallengeExploiter")

    const contract = await contractFactory.deploy({value})
    const exploiterContract = await exploiterContractFactory.deploy(contract.address)

    await contract.deployed()
    await exploiterContract.deployed()

    const tx = await exploiterContract.lockInGuess({value})
    await tx.wait()

    let exploited = false
    while(!exploited){
      try {
        const exploitTx = await exploiterContract.exploit()
        await exploitTx.wait() 
  
        if(await contract.isComplete()){
          exploited = true
        }
      } catch (error) {
      }
    }

    expect(await contract.isComplete()).to.be.true;
  });
});