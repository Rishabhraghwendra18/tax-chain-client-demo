// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

const WETH = "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9";

async function main() {

  const ContractorRegistery = await hre.ethers.getContractFactory(
    "ContractorRegistery"
  );
  const contractorRegistery = await ContractorRegistery.deploy(WETH);
  await contractorRegistery.deployed();

  const ContractRegistery = await hre.ethers.getContractFactory(
    "ContractRegistery"
  );
  const contractRegistery = await ContractRegistery.deploy(
    WETH,
    contractorRegistery.address
  );
  await contractRegistery.deployed();

  const ConstituencyRegistery = await hre.ethers.getContractFactory(
    "ConstituencyRegistery"
  );
  const constituencyRegistery = await ConstituencyRegistery.deploy(
    WETH,
    contractorRegistery.address
  );

  await constituencyRegistery.deployed();

  const Govt = await hre.ethers.getContractFactory("Govt");
  const govt = await Govt.deploy(WETH, constituencyRegistery.address);

  await govt.deployed();

  console.log("contractorRegistery(CONTRACTOR_ADDRESS): ", contractorRegistery.address);
  console.log("contractRegistery(CONTRACT_ADDRESS): ", contractRegistery.address);
  console.log("constituencyRegistery address(REGISTERY_ADDRESS): ", constituencyRegistery.address);
  console.log("Govt address(GOVT_ADDRESS): ", govt.address);
  await verifyContracts(contractorRegistery,contractRegistery,constituencyRegistery,govt);
}

async function verifyContracts(contractorRegistery,contractRegistery,constituencyRegistery,govt) {
  await hre.run("verify:verify",{
    address:contractorRegistery.address,
    constructorArguments:[
      WETH,
    ]
  });

  await hre.run("verify:verify",{
    address:contractRegistery.address,
    constructorArguments:[
      WETH,
      contractorRegistery.address
    ]
  });

  await hre.run("verify:verify",{
    address:constituencyRegistery.address,
    constructorArguments:[
      WETH,
      contractorRegistery.address
    ]
  });

  await hre.run("verify:verify",{
    address:govt.address,
    constructorArguments:[
      WETH,
      constituencyRegistery.address
    ]
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
