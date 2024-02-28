import React from 'react';
import { NFTABI } from '@/data/nft';
import { useWriteContract } from 'wagmi';
import { profile } from '@/data/profile';
import Image from 'next/image';

const MintNFT = () => {

  const { writeContract } = useWriteContract()

  const handleMintNFT = async () => {
    try {
      writeContract({ 
        abi: NFTABI,
        address: '0xbE0782e44F162feFFe19b04a60D6b4c21A7d1620',
        functionName: 'mint',
        args: [
          'Sero',
          'https://serox.eth.limo',
          profile.imageUrl,
          '0xc0163E58648b247c143023CFB26C2BAA42C9d9A9',
        ],
     })
    } catch (error) {
      // Handle any errors that occur during the minting process
      console.error('Error minting NFT:', error);
    }
  };

  return (
    <button
      onClick={handleMintNFT}
      className="flex items-center p-1 w-full hover:scale-105 transition-all bg-purple rounded-xl mb-3 max-w-md"
    >
      <div className="flex items-center text-center max-h-12 h-12 w-full">
        <div className="w-4 h-4 ml-6">
          {profile.imageUrl && (
            <Image
              className="rounded-sm"
              alt={profile.name}
              src={profile.imageUrl}
              width={16}
              height={16}
            />
          )}
        </div>
        <h2 className="flex justify-center items-center font-semibold w-full text-white -ml-10">
          Mint my contact card as an NFT
        </h2>
      </div>
    </button>
  );  
};

export default MintNFT;