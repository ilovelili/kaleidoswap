/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { Contract, ContractOptions, EventOptions } from "web3-eth-contract";
import { EventLog } from "web3-core";
import { EventEmitter } from "events";
import { Callback, ContractEvent, TransactionObject } from "./types";

export class JuicyToken extends Contract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  );
  clone(): JuicyToken;
  methods: {
    DELEGATION_TYPEHASH(): TransactionObject<string>;

    DOMAIN_TYPEHASH(): TransactionObject<string>;

    allowance(owner: string, spender: string): TransactionObject<BN>;

    approve(
      spender: string,
      amount: number | string
    ): TransactionObject<boolean>;

    balanceOf(account: string): TransactionObject<BN>;

    checkpoints(
      arg0: string,
      arg1: number | string
    ): TransactionObject<{
      fromBlock: BN;
      votes: BN;
      0: BN;
      1: BN;
    }>;

    decimals(): TransactionObject<BN>;

    decreaseAllowance(
      spender: string,
      subtractedValue: number | string
    ): TransactionObject<boolean>;

    increaseAllowance(
      spender: string,
      addedValue: number | string
    ): TransactionObject<boolean>;

    name(): TransactionObject<string>;

    nonces(arg0: string): TransactionObject<BN>;

    numCheckpoints(arg0: string): TransactionObject<BN>;

    owner(): TransactionObject<string>;

    renounceOwnership(): TransactionObject<void>;

    symbol(): TransactionObject<string>;

    totalSupply(): TransactionObject<BN>;

    transfer(
      recipient: string,
      amount: number | string
    ): TransactionObject<boolean>;

    transferFrom(
      sender: string,
      recipient: string,
      amount: number | string
    ): TransactionObject<boolean>;

    transferOwnership(newOwner: string): TransactionObject<void>;

    mint(_to: string, _amount: number | string): TransactionObject<void>;

    delegates(delegator: string): TransactionObject<string>;

    delegate(delegatee: string): TransactionObject<void>;

    delegateBySig(
      delegatee: string,
      nonce: number | string,
      expiry: number | string,
      v: number | string,
      r: string | number[],
      s: string | number[]
    ): TransactionObject<void>;

    getCurrentVotes(account: string): TransactionObject<BN>;

    getPriorVotes(
      account: string,
      blockNumber: number | string
    ): TransactionObject<BN>;
  };
  events: {
    Approval: ContractEvent<{
      owner: string;
      spender: string;
      value: BN;
      0: string;
      1: string;
      2: BN;
    }>;
    DelegateChanged: ContractEvent<{
      delegator: string;
      fromDelegate: string;
      toDelegate: string;
      0: string;
      1: string;
      2: string;
    }>;
    DelegateVotesChanged: ContractEvent<{
      delegate: string;
      previousBalance: BN;
      newBalance: BN;
      0: string;
      1: BN;
      2: BN;
    }>;
    OwnershipTransferred: ContractEvent<{
      previousOwner: string;
      newOwner: string;
      0: string;
      1: string;
    }>;
    Transfer: ContractEvent<{
      from: string;
      to: string;
      value: BN;
      0: string;
      1: string;
      2: BN;
    }>;
    allEvents: (
      options?: EventOptions,
      cb?: Callback<EventLog>
    ) => EventEmitter;
  };
}
