import { updatePointsInFirestore } from './firestoreService';

export const handleRecycling = async (userAddress, points) => {
    try {
        // Assume contractService.js contains functions to interact with smart contracts
        const tx = await contractService.addPointsToUser(userAddress, points);

        // Wait for transaction confirmation
        await tx.wait();
        console.log('Transaction confirmed, updating Firestore');

        // After successful transaction, update Firestore
        await updatePointsInFirestore(userAddress, points);
    } catch (error) {
        console.error('Error in recycling process:', error);
    }
};
