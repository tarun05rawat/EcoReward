import { ethers } from "ethers";

// Connect to Infura using Goerli (or mainnet/testnet based on your needs)
const INFURA_PROJECT_ID = "YOUR_INFURA_PROJECT_ID";
const provider = new ethers.providers.InfuraProvider("goerli", INFURA_PROJECT_ID);

// Function to get the signer using MetaMask or another wallet
async function getSigner() {
  if (window.ethereum) {
    await window.ethereum.request({ method: 'eth_requestAccounts' });  // Prompt user to connect wallet
    const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
    return web3Provider.getSigner();  // Returns a signer from MetaMask or connected wallet
  } else {
    throw new Error("Ethereum wallet is not connected");
  }
}

export { provider, getSigner };
