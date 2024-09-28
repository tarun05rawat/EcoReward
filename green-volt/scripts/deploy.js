async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    const BatteryTracking = await ethers.getContractFactory("BatteryTracking");
    const batteryTracking = await BatteryTracking.deploy();
  
    console.log("BatteryTracking contract deployed at:", batteryTracking.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  