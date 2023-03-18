const { ethers, utils } = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners();
  const MyGovernor = await ethers.getContractFactory("MyGovernor");
  const governor = MyGovernor.attach("YOUR_DEPLOYED_GOVERNOR_ADDRESS");

  const MyToken = await ethers.getContractFactory("MyToken");
  const token = MyToken.attach("YOUR_DEPLOYED_TOKEN_ADDRESS");

  const proposalData = token.interface.encodeFunctionData("mint", [owner.address, utils.parseEther("25000")]);
  const descriptionHash = utils.keccak256(utils.toUtf8Bytes("Give the owner more tokens!"));

  const tx = await governor.execute([token.address], [0], [proposalData], descriptionHash);
  await tx.wait();

  console.log("Proposal executed successfully!");
}

main();
