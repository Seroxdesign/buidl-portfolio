import * as React from "react";
import {
  type BaseError,
  useWaitForTransactionReceipt,
  useWriteContract,
  useAccount,
} from "wagmi";
import { balabi } from "../abi/balswap";
import { parseEther } from "viem";

export function BuyPlayerAWinToken() {
  const { data: hash, error, isPending, writeContract } = useWriteContract();
  const senderAddress1 = useAccount();
  const walletAddress = senderAddress1?.address;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    //const formData = new FormData(e.target as HTMLFormElement);

    //const tokenId = formData.get("tokenId") as string;
    //poolid bytes32 0xdbe73929a0e79003f3a717c7f7e21ad9572e523900010000000000000000008e
    // kind uint8 0
    // assetin address fsc token address = 0xc019e03f801c2a59abc8a6d8eb6a7c4b4f668ea4
    // "assetOut":address "0x2cb367dadebf85c6ee81182e96ea2ed5270922b9",
    // amount : uint256  "amount":"10000000000000000000",
    // userdata bytes "userData":"0x"
    // Tuple 1

    const singleSwap = {
      poolId:
        "0xdbe73929a0e79003f3a717c7f7e21ad9572e523900010000000000000000008e" as `0x${string}`,
      kind: 0,
      assetIn: "0xc019e03f801c2a59abc8a6d8eb6a7c4b4f668ea4" as `0x${string}`,
      assetOut: "0x2cb367dadebf85c6ee81182e96ea2ed5270922b9" as `0x${string}`,
      amount: parseEther("10"),
      userData: "0x" as `0x${string}`,
    };

    //"sender": address "0x61072E5d7456C95Ce02f26C83d1AD476bAA5bA91",
    //"recipient": address "0x61072E5d7456C95Ce02f26C83d1AD476bAA5bA91",
    //"fromInternalBalance":bool false,
    //"toInternalBalance": bool false
    // Tuple2

    // const senderAddress = "0x61072E5d7456C95Ce02f26C83d1AD476bAA5bA91";
    // Replace the above line with the following line to use the connected wallet address
    const senderAddress = walletAddress;
    const recepientAddress = walletAddress;

    const fundManagement = {
      sender: `${senderAddress}` as `0x${string}`,
      recipient: `${recepientAddress}` as `0x${string}`,
      fromInternalBalance: false,
      toInternalBalance: false,
    };

    // limit uint256 0
    const limit = parseEther("10"); // hard coded to 10 USDC
    // deadline uint256 (block.timestamp + 120 mins)
    const deadline = BigInt(Math.floor(Date.now() / 1000) + 120 * 60);

    writeContract({
      address: "0xBA12222222228d8Ba445958a75a0704d566BF2C8",
      abi: balabi,
      functionName: "swap",
      args: [singleSwap, fundManagement, limit, deadline], // Enter swap function arguments here
    });
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return (
    <form onSubmit={submit}>
      <button
        disabled={isPending}
        type="submit"
        className="p-2 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed bg-purple w-100"
      >
        {" "}
        {isPending ? "Awaiting Confirmation..." : "Step 2. Buy"}{" "}
      </button>
      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && <div>Waiting for confirmation...</div>}
      {isConfirmed && <div>Transaction confirmed.</div>}
      {error && (
        <div>Error: {(error as BaseError).shortMessage || error.message}</div>
      )}
    </form>
  );
}

// pool id = 0xdbe73929a0e79003f3a717c7f7e21ad9572e523900010000000000000000008e
