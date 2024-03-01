import * as React from "react";
import { useSendTransaction, useReadContract } from "wagmi";
import { parseEther } from "viem";

export function SendTransaction() {
  const { data: hash, sendTransaction, isPending } = useSendTransaction();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const value = formData.get("value") as string;
    sendTransaction({
      to: "0x61072E5d7456C95Ce02f26C83d1AD476bAA5bA91",
      value: parseEther(value),
    });
  }

  return (
    <form
      onSubmit={submit}
      className="flex flex-col items-center justify-center space-y-4"
    >
      <h1 className="text-2xl font-bold">Buy me a coffee!</h1>
      <input
        name="value"
        placeholder="0.05 ETH"
        required
        className="p-2 border border-gray-300 rounded"
      />
      <button
        type="submit"
        disabled={isPending}
        className="p-2 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed bg-purple w-100"
      >
        {isPending ? "Confirming..." : "Donate"}
      </button>
      {hash && <div className="text-gray-500">Transaction Hash: {hash}</div>}
    </form>
  );
}
