#!/usr/bin/env bash

# Deploy contracts
truffle migrate --reset --network rinkeby

# Verify Contracts on Etherscan
truffle run verify JuicyToken --network rinkeby --license SPDX-License-Identifier
truffle run verify OrangeFarmer --network rinkeby --license SPDX-License-Identifier

# Flatten Contracts
./node_modules/.bin/truffle-flattener contracts/JuicyToken.sol > flats/JuicyToken_flat.sol
./node_modules/.bin/truffle-flattener contracts/OrangeFarmer.sol > flats/OrangeFarmer_flat.sol
