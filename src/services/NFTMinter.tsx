import React, { useState } from "react";
import Web3 from "web3";
import wagmi from "wagmi";

// Replace with your contract's ABI and address
const contractABI = [];
const contractAddress = "";

const MintNFT = () => {
  const [account, setAccount] = useState("");

  const mintNFT = async () => {
    // Initialize web3 and the contract
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    // Request account access
    const accounts = await window.ethereum.enable();
    setAccount(accounts[0]);

    // Mint the NFT
    const wagmiContract = wagmi(contract);
    wagmiContract.mint(account, 1);
  };

  return (
    <div>
      <button onClick={mintNFT}>Mint NFT</button>
    </div>
  );
};

export default MintNFT;
