import {ethers} from "ethers";

// Connect to the Ethereum blockchain
const provider = new ethers.providers.Web3Provider(window.ethereum);

// Signer represents the account interacting with the contract
const signer = provider.getSigner();

// Address of the deployed contract and ABI (Application Binary Interface)
const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
const contractABI = [
  // Add only the parts of the ABI that you're using
  "function purchaseBattery(uint256 amount) external",
  "function returnBattery(uint256 amount) external",
  "function getUserData(address _user) external view returns (uint256 batteriesBought, uint256 batteriesReturned)",
  "event BatteryPurchased(address indexed user, uint256 amount)",
  "event BatteryReturned(address indexed user, uint256 amount, uint256 reward)"
];

// Create the contract instance
const batteryContract = new ethers.Contract(contractAddress, contractABI, signer);

// Function to purchase batteries
async function purchaseBattery(amount) {
    const tx = await batteryContract.purchaseBattery(amount);
    await tx.wait();  // Wait for the transaction to be mined
    console.log('Batteries purchased:', amount);
}

// Function to return batteries
async function returnBattery(amount) {
    const tx = await batteryContract.returnBattery(amount);
    await tx.wait();  // Wait for the transaction to be mined
    console.log('Batteries returned:', amount);
}

// Function to get user data
async function getUserData(userAddress) {
    const [bought, returned] = await batteryContract.getUserData(userAddress);
    console.log('Batteries bought:', bought);
    console.log('Batteries returned:', returned);
}
