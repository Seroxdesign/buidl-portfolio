import React, { useEffect } from 'react';
import { NFTABI } from '@/data/nft';
import { useReadContract } from 'wagmi';import { profile } from '@/data/profile';
import Image from 'next/image';

const ReadNFT = () => {

  const NFTContract = {
    abi: NFTABI,
    address: '0xbE0782e44F162feFFe19b04a60D6b4c21A7d1620',
  } as const

  const result = useReadContract({
    ...NFTContract,
    functionName: 'getNFTData',
    args: ["1"],
  })

  useEffect(() => {
    console.log(result)
  }, [result])

  return (
    <a
      href={result?.data[1] as string || '#'}
      className="flex items-center p-1 w-full hover:scale-105 transition-all bg-purple rounded-xl mb-3 max-w-md"
    >
      <div className="flex items-center text-center max-h-12 h-12 w-full">
        <div className="w-4 h-4 ml-6">
          {result && (
            <Image
              className="rounded-sm"
              alt={(result?.data[0]) as string || ""}
              src={(result?.data[2]) as string || ""}
              width={16}
              height={16}
            />
          )}
        </div>
        <h2 className="flex justify-center items-center font-semibold w-full text-white -ml-10">
          {result?.data[0] + result?.data[3] || "NFT"}
        </h2>
      </div>
    </a>
  );  
};

export default ReadNFT;