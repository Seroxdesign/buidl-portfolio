import { useEffect, useState } from "react";
import { Network } from "alchemy-sdk";
import { AlchemyMultichainClient } from "@/lib/alchemy-multichain-client";

const config = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_MAINNET,
  network: Network.ETH_MAINNET,
};

const overrides = {
  [Network.MATIC_MAINNET]: {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_MATIC,
  },
  [Network.OPT_MAINNET]: {  
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_OPTIMISM,
  },
}

const alchemy = new AlchemyMultichainClient(config, overrides);

type Maybe<T> = T | null;

export const useNFTCollectibles = (
  owner: string
): {
  data: any;
  loading: boolean;
  error: Maybe<string>;
} => {
  const [data, setData] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Maybe<string>>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const allData = await fetchAlchemyAllData(owner);
        setData(allData);
      } catch (err) {
        console.error("error", error);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    if (owner) {
      load();
    }
  }, [owner]);

  return { data, loading, error };
};

const fetchAlchemyAllData = async (owner: string): Promise<Array<any>> => {
  return await fetchAlchemyData(owner)
};

const fetchAlchemyData = async (owner: string) => {
  const mainnetNfts = await alchemy
  .forNetwork(Network.ETH_MAINNET)
  .nft.getNftsForOwner(owner as string, { pageSize: 5 })

  const maticNfts = await alchemy
  .forNetwork(Network.MATIC_MAINNET)
  .nft.getNftsForOwner(owner as string, { pageSize: 100 });

  const optimismNfts = await alchemy
  .forNetwork(Network.OPT_MAINNET)
  .nft.getNftsForOwner(owner as string, { pageSize: 5 });

  console.log(maticNfts.ownedNfts.filter((nft: any) => nft.tokenType !== "ERC1155"));

  return [{ mainnetNfts, maticNfts, optimismNfts }]
};