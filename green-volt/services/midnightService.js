// Import necessary libraries or APIs for Midnight (replace with real Midnight SDK/API)
const MIDNIGHT_API_URL = "https://midnight-api.com/addProof";

// Function to add recycling proof using Midnight
export async function addRecyclingProof(batteryID, center, txHash) {
  try {
    const response = await fetch(`${MIDNIGHT_API_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        batteryID,
        recyclingCenter: center,
        txHash,
        timestamp: Date.now()
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to add recycling proof to Midnight");
    }

    const data = await response.json();
    console.log("Proof stored in Midnight: ", data);
    return data;
  } catch (error) {
    console.error("Error storing proof in Midnight: ", error);
    throw error;
  }
}
