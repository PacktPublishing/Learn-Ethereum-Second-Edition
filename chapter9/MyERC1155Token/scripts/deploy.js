const hre = require("hardhat");

async function main() {
  const ERC1155NFTToken = await hre.ethers.getContractFactory("ERC1155NFTToken");
  const erc1155NFTToken = await ERC1155NFTToken.deploy();
  await erc1155NFTToken.deployed();
  console.log("ERC1155NFTToken deployed to:", erc1155NFTToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
