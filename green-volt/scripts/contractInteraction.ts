import { ethers } from 'ethers';
import bytecode from './bytecode.json';  // Importing the bytecode JSON
import abi from './abi.json';  // Import your ABI JSON as well (adjust the path as needed)
import dotenv from 'dotenv';
dotenv.config();

async function deployContract() {
  const provider = new ethers.providers.JsonRpcProvider(`https://holesky.infura.io/v3/${process.env.api_key}`);
  const wallet = new ethers.Wallet(`${process.env.api_key}`, provider);

  // Use imported ABI and bytecode
  const abiInterface: ethers.ContractInterface = abi;
  const bytecodeHex = bytecode.bytecode;  // Access the bytecode string from JSON

  const factory = new ethers.ContractFactory(abiInterface, bytecodeHex, wallet);
  const contract = await factory.deploy();
  await contract.deployed();

  console.log("Contract deployed at:", contract.address);
}

deployContract();
