const { ethers } = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners();
  const MyToken = await ethers.getContractFactory("MyToken");
  const token = MyToken.attach("YOUR_DEPLOYED_TOKEN_ADDRESS");

  const tx = await token.delegate(owner.address);
  await tx.wait();

  console.log("Votes delegated to:", owner.address);
}

main();
