import { recordRecycling } from "./contractService";
import { addRecyclingProof } from "./midnightService";
import { auth, db } from "../firebaseConfig";  // Firebase imports
import { doc, setDoc } from "firebase/firestore";

// Main handler to coordinate recycling actions
export async function handleRecycling(batteryID, center) {
  try {
    // Step 1: Interact with the smart contract and get transaction hash
    const txHash = await recordRecycling(batteryID, center);

    // Step 2: Store proof in Midnight
    const midnightProof = await addRecyclingProof(batteryID, center, txHash);

    // Step 3: Optionally store proof in Firebase for easier access
    const user = auth.currentUser;
    if (user) {
      await setDoc(doc(db, "recyclingProofs", txHash), {
        uid: user.uid,
        batteryID,
        center,
        txHash,
        timestamp: Date.now(),
        midnightProofID: midnightProof.id,  // Use the proof ID from Midnight
      });
      console.log("Transaction stored in Firebase");
    }
  } catch (error) {
    console.error("Error in recycling process: ", error);
  }
}
