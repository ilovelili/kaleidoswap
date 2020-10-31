const JuicyToken = artifacts.require("JuicyToken.sol");
const OrangeFarmer = artifacts.require("OrangeFarmer.sol");

module.exports = async function (deployer) {
  // Deploy Juicy Token
  await deployer.deploy(JuicyToken);
  const juicyToken = await JuicyToken.deployed();

  // Deploy OrangeFarmer Contract
  await deployer.deploy(
    OrangeFarmer,
    juicyToken.address,
    process.env.DEV_ADDRESS, // Your address where you get juicy tokens - should be a multisig
    web3.utils.toWei(process.env.TOKENS_PER_BLOCK), // Number of tokens rewarded per block, e.g., 100
    process.env.START_BLOCK, // Block number when token mining starts
    process.env.BONUS_END_BLOCK // Block when bonus ends
  );

  // Make OrangeFarmer contract token owner
  const masterChef = await OrangeFarmer.deployed();
  await juicyToken.transferOwnership(masterChef.address);

  // Add Liquidity pool for rewards, e.g., "ETH/DAI Pool"
  await masterChef.add(
    process.env.ALLOCATION_POINT,
    process.env.LP_TOKEN_ADDRESS,
    false
  );

  // todo: Add more liquidity pools here upon deployment, or add them later manually
};
