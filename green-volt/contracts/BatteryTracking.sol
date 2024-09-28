// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BatteryTracking {

    struct UserData {
        uint256 batteriesBought;
        uint256 batteriesReturned;
    }

    mapping(address => UserData) public users;

    event BatteryPurchased(address indexed user, uint256 amount);
    event BatteryReturned(address indexed user, uint256 amount, uint256 reward);

    function purchaseBattery(uint256 amount) external {
        users[msg.sender].batteriesBought += amount;
        emit BatteryPurchased(msg.sender, amount);
    }

    function returnBattery(uint256 amount) external {
        users[msg.sender].batteriesReturned += amount;
        uint256 reward = amount * 10;  // Dummy reward calculation
        emit BatteryReturned(msg.sender, amount, reward);
    }

    function getUserData(address _user) external view returns (uint256 batteriesBought, uint256 batteriesReturned) {
        UserData memory data = users[_user];
        return (data.batteriesBought, data.batteriesReturned);
    }
}
