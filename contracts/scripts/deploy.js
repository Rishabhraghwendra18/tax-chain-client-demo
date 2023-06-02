// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const WETH='0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9';
  const Govt = await hre.ethers.getContractFactory("Govt");
  const govt = await Govt.deploy(WETH);

  await govt.deployed();

  const Constituency = await hre.ethers.getContractFactory("Constituency");
  const constituency = await Constituency.deploy(WETH);

  await constituency.deployed();

 console.log("Govt address: ",govt.address);
 console.log("Constituency address: ",constituency.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
