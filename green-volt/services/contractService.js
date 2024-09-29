import { getSigner } from "../constants/infuraConfig";  // Import the Infura config

// Contract ABI and address (replace these with your actual deployed contract data)
const contractABI = [/* Your contract ABI here */];
const contractAddress = "0xYourContractAddress";

// Function to record recycling in the smart contract
export async function recordRecycling(batteryID, center) {
  try {
    const signer = await getSigner();  // Get the signer (MetaMask)
    const contract = new ethers.Contract(contractAddress, contractABI, signer);  // Connect to contract
    
    // Interact with the smart contract
    const tx = await contract.recordRecycling(batteryID, center);
    await tx.wait();  // Wait for the transaction to be mined
    console.log("Recycling recorded on blockchain: ", tx.hash);
    
    return tx.hash;  // Return the transaction hash
  } catch (error) {
    console.error("Error recording recycling: ", error);
    throw error;
  }
}
