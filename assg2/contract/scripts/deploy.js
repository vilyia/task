const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const contractFactory = await ethers.getContractFactory("BkdTask");
  const contract = await contractFactory.deploy("BkdTask", "BKT", ethers.utils.parseEther("10000000"));

  await contract.deployed();

  console.log("Contract address:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
