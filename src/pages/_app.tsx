import "@/styles/globals.css";
import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet, polygonMumbai, polygon } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { ThemeProvider } from "@/components/themes";

import type { AppProps } from "next/app";
const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [mainnet, polygonMumbai, polygon],
    transports: {
      // RPC URL for each chain
      [mainnet.id]: http(
        `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_MAINNET}`,
      ),
      [polygonMumbai.id]: http(
        'https://polygon-mumbai-pokt.nodies.app'
      ),
      [polygon.id]: http(
        'https://polygon-pokt.nodies.app'
      ),
    },

    // Required API Keys
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',

    // Required App Info
    appName: "Crypto Portfolio",

    // Optional App Info
    appDescription: "A great app for managing your portfolio",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
);
export default function App({ Component, pageProps }: AppProps) {

const queryClient = new QueryClient();
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>
        <ThemeProvider
          
          
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
        <Component {...pageProps} />;
        </ThemeProvider>
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
