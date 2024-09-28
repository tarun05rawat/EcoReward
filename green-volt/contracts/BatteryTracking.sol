// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BatteryRecycling {
    address public owner;

    // Structure to store battery details
    struct Battery {
        uint256 id;
        address owner;
        bool isRecycled;
        uint256 rewardAmount;
    }

    // Mapping of battery IDs to battery data
    mapping(uint256 => Battery) public batteries;

    // Event to trigger when battery is recycled
    event BatteryRecycled(uint256 batteryId, address user, uint256 reward);

    // Modifier to ensure only the owner can call certain functions
    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor() {
        owner = msg.sender;  // Assign the contract deployer as the owner
    }

    // Function to register a new battery
    function registerBattery(uint256 batteryId, uint256 rewardAmount) public onlyOwner {
        require(batteries[batteryId].id == 0, "Battery already registered");
        
        batteries[batteryId] = Battery({
            id: batteryId,
            owner: address(0),  // No owner until it's claimed
            isRecycled: false,
            rewardAmount: rewardAmount
        });
    }

    // Function to recycle a battery
    function recycleBattery(uint256 batteryId) public {
        require(batteries[batteryId].id != 0, "Battery not registered");
        require(!batteries[batteryId].isRecycled, "Battery already recycled");

        // Mark the battery as recycled and assign the owner
        batteries[batteryId].isRecycled = true;
        batteries[batteryId].owner = msg.sender;

        // Transfer reward (you could use ERC20 tokens here for real rewards)
        uint256 reward = batteries[batteryId].rewardAmount;
        
        // Emit an event that the battery was recycled
        emit BatteryRecycled(batteryId, msg.sender, reward);
    }

    // Function to get battery information (for UI display)
    function getBatteryInfo(uint256 batteryId) public view returns (address, bool, uint256) {
        Battery memory battery = batteries[batteryId];
        return (battery.owner, battery.isRecycled, battery.rewardAmount);
    }
}
