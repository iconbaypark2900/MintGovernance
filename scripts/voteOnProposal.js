const { ethers, utils } = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners();
  const MyGovernor = await ethers.getContractFactory("MyGovernor");
  const governor = MyGovernor.attach("YOUR_DEPLOYED_GOVERNOR_ADDRESS");

  const MyToken = await ethers.getContractFactory("MyToken");
  const token = MyToken.attach("YOUR_DEPLOYED_TOKEN_ADDRESS");

  const proposalData = token.interface.encodeFunctionData("mint", [owner.address, utils.parseEther("25000")]);
  const tx = await governor.propose([token.address], [0], [proposalData], "Give the owner more tokens!");
  const receipt = await tx.wait();
  const event = receipt.events.find((x) => x.event === "ProposalCreated");
  const { proposalId } = event.args;

  console.log("Proposal created with ID:", proposalId);
}

main();
