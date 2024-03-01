import * as React from "react";
import {
  type BaseError,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { parseEther } from "viem";
import { abi } from "../abi/fsc";

export function ApproveERC20() {
  //4. Use the write contract hook . 5.Add loading state
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  //3. Form handler send ERC20 amount to approve
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    //const amount = parseEther(BigInt(formData.get("amount") as string));
    const amount = parseEther(formData.get("amount") as string);
    const poolAddress = "0xBA12222222228d8Ba445958a75a0704d566BF2C8";
    //let hexString: string = '0x' + amount.toString(16);
    //3. End Form handler send ERC20 amount to approve

    //4. Use the write contract hook
    writeContract({
      address: "0xc019E03f801C2a59ABc8a6d8Eb6A7c4B4f668ea4",
      abi,
      functionName: "approve",
      args: [poolAddress, amount],
    });
  }
  //6. wait for tx receipt
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });
  //6. end wait for tx receipt

  return (
    <form onSubmit={submit}>
      <input name="amount" placeholder="10" required />
      <button
        disabled={isPending}
        type="submit"
        className="p-2 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed bg-purple w-100"
      >
        {isPending ? "Waiting for Approval..." : "Approve & Buy"}{" "}
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
