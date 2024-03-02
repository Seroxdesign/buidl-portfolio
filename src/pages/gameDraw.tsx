import { ConnectKitButton } from "connectkit";
import Wrapper from "@/components/Wrapper";
import Image from "next/image";
import { ApproveERC20 } from "@/components/approveERC20";
import { BuyDrawToken } from "@/components/buyDrawToken";

export default function SwapDraw() {
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
        <h1>Game Draw Page</h1>
        <br />
        <h2>Bet on Game ending in a draw!</h2>
        <p>Amount in Fake USDC</p>
        <ApproveERC20 />
        <BuyDrawToken />
      </Wrapper>
    </main>
  );
}
