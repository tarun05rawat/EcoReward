const Breadboard = require("@breadboard-ai/breadboard");

const bb = new Breadboard();

// Create the Sustainability Expert node
bb.createNode("SustainabilityExpert").onRequest(async (request) => {
  const userQuery = request.input; // Get user's question/input
  const response = await getSustainabilityInfo(userQuery); // Fetch sustainability info
  return {
    output: response, // Return response to the user
  };
});

// Function to handle queries related to sustainability
async function getSustainabilityInfo(query) {
  const sustainabilityTips = {
    recycling:
      "Recycling can save up to 30% of energy compared to creating new products from raw materials.",
    "carbon footprint":
      "You can reduce your carbon footprint by using reusable bags, recycling, and minimizing your energy consumption.",
    composting:
      "Composting organic waste helps reduce methane emissions and enriches the soil with nutrients.",
    "energy efficiency":
      "Energy-efficient appliances can save up to 20% on your energy bills and reduce emissions.",
    "sustainable transportation":
      "Public transportation, walking, and biking reduce carbon emissions significantly compared to driving alone.",
    "sustainable fashion":
      "Choosing eco-friendly materials like organic cotton or recycled polyester helps reduce the fashion industry’s environmental impact.",
    "water conservation":
      "Install water-efficient fixtures and reduce shower time to save water.",
    "renewable energy":
      "Switching to solar, wind, or geothermal energy helps reduce dependency on fossil fuels.",
    // Add more sustainability advice here
  };

  // Return the relevant information based on the user's query
  return (
    sustainabilityTips[query.toLowerCase()] ||
    "I'm still learning about that topic. Please ask another sustainability question."
  );
}

// Start the Breadboard server to handle requests
bb.start();
