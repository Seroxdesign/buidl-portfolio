import { ConnectKitButton } from "connectkit";
import Wrapper from "@/components/Wrapper";
import Image from "next/image";

export default function SwapPage() {
  return (
    <main>
      <Image
        alt="background-image"
        src="/Banner.svg"
        height="380"
        width="2000"
        className="fixed z-[-1] top-0 left-0 object-cover md:h-96 min-h-48 w-full"
      />
      <div className="fixed top-3 right-3 z-10">
        <ConnectKitButton />
      </div>
      <Wrapper>
        <h1>Player A Page</h1>
        <br />
        <h2>Bet on Player A to win the game.</h2>
        <p>Amount in USDC</p>
        <input name="Amount" placeholder="10" required />
        <button
          type="submit"
          className="p-2 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed bg-purple w-100"
        >
          {" "}
          Bet on Player A{" "}
        </button>
      </Wrapper>
    </main>
  );
}
