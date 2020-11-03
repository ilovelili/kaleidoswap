const KaleidoToken = artifacts.require('KaleidoToken.sol')
const KaleidoBakery = artifacts.require('KaleidoBakery.sol')

module.exports = async function (deployer) {
  // Deploy Kaleido Token
  await deployer.deploy(KaleidoToken)
  const kaleidoToken = await KaleidoToken.deployed()

  // Deploy KaleidoBakery Contract
  await deployer.deploy(
    KaleidoBakery,
    kaleidoToken.address,
    process.env.DEV_ADDRESS, // Your address where you get kaleido tokens - should be a multisig
    web3.utils.toWei(process.env.TOKENS_PER_BLOCK), // Number of tokens rewarded per block, e.g., 100
    process.env.START_BLOCK, // Block number when token mining starts
    process.env.BONUS_END_BLOCK, // Block when bonus ends
  )

  // Make KaleidoBakery contract token owner
  const kaleidoBakery = await KaleidoBakery.deployed()
  await kaleidoToken.transferOwnership(kaleidoBakery.address)

  // Add Liquidity pool for rewards, e.g., "ETH/DAI Pool"
  await kaleidoBakery.add(
    process.env.ALLOCATION_POINT,
    process.env.LP_TOKEN_ADDRESS,
    false,
  )

  // todo: Add more liquidity pools here upon deployment, or add them later manually
}
