#!/usr/bin/env bash
network=$1

echo "Network: $network"

truffle migrate --reset --network $network

# Verify Contracts on Etherscan
truffle run verify KaleidoToken --network $network --license SPDX-License-Identifier
truffle run verify KaleidoMaster --network $network --license SPDX-License-Identifier

# Flatten Contracts
./node_modules/.bin/truffle-flattener contracts/KaleidoToken.sol > flats/KaleidoToken_flat.sol
./node_modules/.bin/truffle-flattener contracts/KaleidoMaster.sol > flats/KaleidoMaster_flat.sol