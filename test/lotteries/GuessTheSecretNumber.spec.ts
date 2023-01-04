import { expect } from "chai";
import { ethers,  } from "hardhat";

const { utils, provider } = ethers;

describe("GuessTheSecretNumber", () => {
  it("Solves the challenge", async () => {
    const contractFactory = await ethers.getContractFactory("GuessTheSecretNumber");
    const value = utils.parseEther("1")
    const contract = await contractFactory.deploy({value})
    await contract.deployed()

    const answer = await provider.getStorageAt(contract.address, 0);
    let target = 0

    for(let i = 0; i < 256; i++){
      const hash = utils.keccak256([i]);
      if(hash === answer){
        target = i
        break;
      }
    }

    const tx = await contract.guess(target, {value})
    await tx.wait()

    expect(await contract.isComplete()).to.be.true
  });
});