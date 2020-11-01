/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from "ethers";
import {
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface OrangeFarmerInterface extends ethers.utils.Interface {
  functions: {
    "BONUS_MULTIPLIER()": FunctionFragment;
    "bonusEndBlock()": FunctionFragment;
    "devaddr()": FunctionFragment;
    "kaleido()": FunctionFragment;
    "kaleidoPerBlock()": FunctionFragment;
    "migrator()": FunctionFragment;
    "owner()": FunctionFragment;
    "poolInfo(uint256)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "startBlock()": FunctionFragment;
    "totalAllocPoint()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "userInfo(uint256,address)": FunctionFragment;
    "poolLength()": FunctionFragment;
    "add(uint256,address,bool)": FunctionFragment;
    "set(uint256,uint256,bool)": FunctionFragment;
    "setMigrator(address)": FunctionFragment;
    "migrate(uint256)": FunctionFragment;
    "getMultiplier(uint256,uint256)": FunctionFragment;
    "pendingKaleido(uint256,address)": FunctionFragment;
    "massUpdatePools()": FunctionFragment;
    "updatePool(uint256)": FunctionFragment;
    "deposit(uint256,uint256)": FunctionFragment;
    "withdraw(uint256,uint256)": FunctionFragment;
    "emergencyWithdraw(uint256)": FunctionFragment;
    "dev(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "BONUS_MULTIPLIER",
    values?: void
  ): string;
  encodeFunctionData(functionFragment: "bonusEndBlock", values?: void): string;
  encodeFunctionData(functionFragment: "devaddr", values?: void): string;
  encodeFunctionData(functionFragment: "kaleido", values?: void): string;
  encodeFunctionData(
    functionFragment: "kaleidoPerBlock",
    values?: void
  ): string;
  encodeFunctionData(functionFragment: "migrator", values?: void): string;
  encodeFunctionData(functionFragment: "owner", values?: void): string;
  encodeFunctionData(
    functionFragment: "poolInfo",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: void
  ): string;
  encodeFunctionData(functionFragment: "startBlock", values?: void): string;
  encodeFunctionData(
    functionFragment: "totalAllocPoint",
    values?: void
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "userInfo",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(functionFragment: "poolLength", values?: void): string;
  encodeFunctionData(
    functionFragment: "add",
    values: [BigNumberish, string, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "set",
    values: [BigNumberish, BigNumberish, boolean]
  ): string;
  encodeFunctionData(functionFragment: "setMigrator", values: [string]): string;
  encodeFunctionData(
    functionFragment: "migrate",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getMultiplier",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "pendingKaleido",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "massUpdatePools",
    values?: void
  ): string;
  encodeFunctionData(
    functionFragment: "updatePool",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "deposit",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "emergencyWithdraw",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "dev", values: [string]): string;

  decodeFunctionResult(
    functionFragment: "BONUS_MULTIPLIER",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "bonusEndBlock",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "devaddr", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "kaleido", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "kaleidoPerBlock",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "migrator", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "poolInfo", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "startBlock", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalAllocPoint",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "userInfo", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "poolLength", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "add", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "set", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setMigrator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "migrate", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getMultiplier",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "pendingKaleido",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "massUpdatePools",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "updatePool", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "emergencyWithdraw",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "dev", data: BytesLike): Result;

  events: {
    "Deposit(address,uint256,uint256)": EventFragment;
    "EmergencyWithdraw(address,uint256,uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "Withdraw(address,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Deposit"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "EmergencyWithdraw"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Withdraw"): EventFragment;
}

export class OrangeFarmer extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: OrangeFarmerInterface;

  functions: {
    BONUS_MULTIPLIER(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    bonusEndBlock(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    devaddr(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    kaleido(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    kaleidoPerBlock(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    migrator(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    /**
     * Returns the address of the current owner.
     */
    owner(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    poolInfo(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      lpToken: string;
      allocPoint: BigNumber;
      lastRewardBlock: BigNumber;
      accKaleidoPerShare: BigNumber;
      0: string;
      1: BigNumber;
      2: BigNumber;
      3: BigNumber;
    }>;

    /**
     * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.
     */
    renounceOwnership(overrides?: Overrides): Promise<ContractTransaction>;

    startBlock(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    totalAllocPoint(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    /**
     * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
     */
    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    userInfo(
      arg0: BigNumberish,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<{
      amount: BigNumber;
      rewardDebt: BigNumber;
      0: BigNumber;
      1: BigNumber;
    }>;

    poolLength(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    add(
      _allocPoint: BigNumberish,
      _lpToken: string,
      _withUpdate: boolean,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    set(
      _pid: BigNumberish,
      _allocPoint: BigNumberish,
      _withUpdate: boolean,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    setMigrator(
      _migrator: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    migrate(
      _pid: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    getMultiplier(
      _from: BigNumberish,
      _to: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    pendingKaleido(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    massUpdatePools(overrides?: Overrides): Promise<ContractTransaction>;

    updatePool(
      _pid: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    deposit(
      _pid: BigNumberish,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    withdraw(
      _pid: BigNumberish,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    emergencyWithdraw(
      _pid: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    dev(_devaddr: string, overrides?: Overrides): Promise<ContractTransaction>;
  };

  BONUS_MULTIPLIER(overrides?: CallOverrides): Promise<BigNumber>;

  bonusEndBlock(overrides?: CallOverrides): Promise<BigNumber>;

  devaddr(overrides?: CallOverrides): Promise<string>;

  kaleido(overrides?: CallOverrides): Promise<string>;

  kaleidoPerBlock(overrides?: CallOverrides): Promise<BigNumber>;

  migrator(overrides?: CallOverrides): Promise<string>;

  /**
   * Returns the address of the current owner.
   */
  owner(overrides?: CallOverrides): Promise<string>;

  poolInfo(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<{
    lpToken: string;
    allocPoint: BigNumber;
    lastRewardBlock: BigNumber;
    accKaleidoPerShare: BigNumber;
    0: string;
    1: BigNumber;
    2: BigNumber;
    3: BigNumber;
  }>;

  /**
   * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.
   */
  renounceOwnership(overrides?: Overrides): Promise<ContractTransaction>;

  startBlock(overrides?: CallOverrides): Promise<BigNumber>;

  totalAllocPoint(overrides?: CallOverrides): Promise<BigNumber>;

  /**
   * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
   */
  transferOwnership(
    newOwner: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  userInfo(
    arg0: BigNumberish,
    arg1: string,
    overrides?: CallOverrides
  ): Promise<{
    amount: BigNumber;
    rewardDebt: BigNumber;
    0: BigNumber;
    1: BigNumber;
  }>;

  poolLength(overrides?: CallOverrides): Promise<BigNumber>;

  add(
    _allocPoint: BigNumberish,
    _lpToken: string,
    _withUpdate: boolean,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  set(
    _pid: BigNumberish,
    _allocPoint: BigNumberish,
    _withUpdate: boolean,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  setMigrator(
    _migrator: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  migrate(
    _pid: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  getMultiplier(
    _from: BigNumberish,
    _to: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  pendingKaleido(
    _pid: BigNumberish,
    _user: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  massUpdatePools(overrides?: Overrides): Promise<ContractTransaction>;

  updatePool(
    _pid: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  deposit(
    _pid: BigNumberish,
    _amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  withdraw(
    _pid: BigNumberish,
    _amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  emergencyWithdraw(
    _pid: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  dev(_devaddr: string, overrides?: Overrides): Promise<ContractTransaction>;

  staticCall: {
    BONUS_MULTIPLIER(overrides?: CallOverrides): Promise<BigNumber>;

    bonusEndBlock(overrides?: CallOverrides): Promise<BigNumber>;

    devaddr(overrides?: CallOverrides): Promise<string>;

    kaleido(overrides?: CallOverrides): Promise<string>;

    kaleidoPerBlock(overrides?: CallOverrides): Promise<BigNumber>;

    migrator(overrides?: CallOverrides): Promise<string>;

    /**
     * Returns the address of the current owner.
     */
    owner(overrides?: CallOverrides): Promise<string>;

    poolInfo(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      lpToken: string;
      allocPoint: BigNumber;
      lastRewardBlock: BigNumber;
      accKaleidoPerShare: BigNumber;
      0: string;
      1: BigNumber;
      2: BigNumber;
      3: BigNumber;
    }>;

    /**
     * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.
     */
    renounceOwnership(overrides?: Overrides): Promise<void>;

    startBlock(overrides?: CallOverrides): Promise<BigNumber>;

    totalAllocPoint(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
     */
    transferOwnership(newOwner: string, overrides?: Overrides): Promise<void>;

    userInfo(
      arg0: BigNumberish,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<{
      amount: BigNumber;
      rewardDebt: BigNumber;
      0: BigNumber;
      1: BigNumber;
    }>;

    poolLength(overrides?: CallOverrides): Promise<BigNumber>;

    add(
      _allocPoint: BigNumberish,
      _lpToken: string,
      _withUpdate: boolean,
      overrides?: Overrides
    ): Promise<void>;

    set(
      _pid: BigNumberish,
      _allocPoint: BigNumberish,
      _withUpdate: boolean,
      overrides?: Overrides
    ): Promise<void>;

    setMigrator(_migrator: string, overrides?: Overrides): Promise<void>;

    migrate(_pid: BigNumberish, overrides?: Overrides): Promise<void>;

    getMultiplier(
      _from: BigNumberish,
      _to: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    pendingKaleido(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    massUpdatePools(overrides?: Overrides): Promise<void>;

    updatePool(_pid: BigNumberish, overrides?: Overrides): Promise<void>;

    deposit(
      _pid: BigNumberish,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<void>;

    withdraw(
      _pid: BigNumberish,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<void>;

    emergencyWithdraw(_pid: BigNumberish, overrides?: Overrides): Promise<void>;

    dev(_devaddr: string, overrides?: Overrides): Promise<void>;
  };

  filters: {
    Deposit(
      user: string | null,
      pid: BigNumberish | null,
      amount: null
    ): EventFilter;

    EmergencyWithdraw(
      user: string | null,
      pid: BigNumberish | null,
      amount: null
    ): EventFilter;

    OwnershipTransferred(
      previousOwner: string | null,
      newOwner: string | null
    ): EventFilter;

    Withdraw(
      user: string | null,
      pid: BigNumberish | null,
      amount: null
    ): EventFilter;
  };

  estimateGas: {
    BONUS_MULTIPLIER(): Promise<BigNumber>;
    bonusEndBlock(): Promise<BigNumber>;
    devaddr(): Promise<BigNumber>;
    kaleido(): Promise<BigNumber>;
    kaleidoPerBlock(): Promise<BigNumber>;
    migrator(): Promise<BigNumber>;
    owner(): Promise<BigNumber>;
    poolInfo(arg0: BigNumberish): Promise<BigNumber>;
    renounceOwnership(): Promise<BigNumber>;
    startBlock(): Promise<BigNumber>;
    totalAllocPoint(): Promise<BigNumber>;
    transferOwnership(newOwner: string): Promise<BigNumber>;
    userInfo(arg0: BigNumberish, arg1: string): Promise<BigNumber>;
    poolLength(): Promise<BigNumber>;
    add(
      _allocPoint: BigNumberish,
      _lpToken: string,
      _withUpdate: boolean
    ): Promise<BigNumber>;
    set(
      _pid: BigNumberish,
      _allocPoint: BigNumberish,
      _withUpdate: boolean
    ): Promise<BigNumber>;
    setMigrator(_migrator: string): Promise<BigNumber>;
    migrate(_pid: BigNumberish): Promise<BigNumber>;
    getMultiplier(_from: BigNumberish, _to: BigNumberish): Promise<BigNumber>;
    pendingKaleido(_pid: BigNumberish, _user: string): Promise<BigNumber>;
    massUpdatePools(): Promise<BigNumber>;
    updatePool(_pid: BigNumberish): Promise<BigNumber>;
    deposit(_pid: BigNumberish, _amount: BigNumberish): Promise<BigNumber>;
    withdraw(_pid: BigNumberish, _amount: BigNumberish): Promise<BigNumber>;
    emergencyWithdraw(_pid: BigNumberish): Promise<BigNumber>;
    dev(_devaddr: string): Promise<BigNumber>;
  };

  populateTransaction: {
    BONUS_MULTIPLIER(): Promise<PopulatedTransaction>;
    bonusEndBlock(): Promise<PopulatedTransaction>;
    devaddr(): Promise<PopulatedTransaction>;
    kaleido(): Promise<PopulatedTransaction>;
    kaleidoPerBlock(): Promise<PopulatedTransaction>;
    migrator(): Promise<PopulatedTransaction>;
    owner(): Promise<PopulatedTransaction>;
    poolInfo(arg0: BigNumberish): Promise<PopulatedTransaction>;
    renounceOwnership(): Promise<PopulatedTransaction>;
    startBlock(): Promise<PopulatedTransaction>;
    totalAllocPoint(): Promise<PopulatedTransaction>;
    transferOwnership(newOwner: string): Promise<PopulatedTransaction>;
    userInfo(arg0: BigNumberish, arg1: string): Promise<PopulatedTransaction>;
    poolLength(): Promise<PopulatedTransaction>;
    add(
      _allocPoint: BigNumberish,
      _lpToken: string,
      _withUpdate: boolean
    ): Promise<PopulatedTransaction>;
    set(
      _pid: BigNumberish,
      _allocPoint: BigNumberish,
      _withUpdate: boolean
    ): Promise<PopulatedTransaction>;
    setMigrator(_migrator: string): Promise<PopulatedTransaction>;
    migrate(_pid: BigNumberish): Promise<PopulatedTransaction>;
    getMultiplier(
      _from: BigNumberish,
      _to: BigNumberish
    ): Promise<PopulatedTransaction>;
    pendingKaleido(
      _pid: BigNumberish,
      _user: string
    ): Promise<PopulatedTransaction>;
    massUpdatePools(): Promise<PopulatedTransaction>;
    updatePool(_pid: BigNumberish): Promise<PopulatedTransaction>;
    deposit(
      _pid: BigNumberish,
      _amount: BigNumberish
    ): Promise<PopulatedTransaction>;
    withdraw(
      _pid: BigNumberish,
      _amount: BigNumberish
    ): Promise<PopulatedTransaction>;
    emergencyWithdraw(_pid: BigNumberish): Promise<PopulatedTransaction>;
    dev(_devaddr: string): Promise<PopulatedTransaction>;
  };
}