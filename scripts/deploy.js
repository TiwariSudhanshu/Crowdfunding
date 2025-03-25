const hre = require("hardhat");

async function main() {

    console.log("Getting contract factory...");
    const Crowdfunding = await hre.ethers.getContractFactory("Crowdfunding");

    console.log("Deploying contract...");
    const crowdfunding = await Crowdfunding.deploy();

    console.log("Awaiting deployment confirmation...");
    await crowdfunding.waitForDeployment();

    console.log("Crowdfunding Contract deployed to:", await crowdfunding.getAddress());
}

main().catch((error) => {
    console.error("Error deploying:", error);
    process.exitCode = 1;
});
