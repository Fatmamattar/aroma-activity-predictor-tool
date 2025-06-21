
// Simplified ML prediction logic based on your Random Forest model
// This simulates the prediction functionality from your Colab code

interface PredictionResult {
  activity: string;
  confidence: number;
}

// Simulated biological activities that your model predicts
const possibleActivities = [
  "antimicrobial",
  "antioxidant", 
  "anti-inflammatory",
  "antifungal",
  "antibacterial",
  "antiviral",
  "analgesic",
  "sedative",
  "stimulant",
  "antiseptic"
];

// Simulate the Random Forest prediction logic
export const predictActivities = (inputValues: number[]): PredictionResult[] => {
  const predictions: PredictionResult[] = [];
  
  // Simulate prediction logic based on input patterns
  // This is a simplified version of what your trained model would do
  possibleActivities.forEach((activity, index) => {
    // Create pseudo-realistic confidence scores based on input values
    // In your actual implementation, this would be the trained model's output
    
    let confidence = 0;
    
    // Different activities are influenced by different parameter combinations
    switch (activity) {
      case "antimicrobial":
        confidence = Math.min(95, Math.max(5, 
          (inputValues[0] * 8.5 + inputValues[2] * 6.2 + inputValues[5] * 7.1) / 3 + 
          Math.random() * 15 - 7.5
        ));
        break;
      case "antioxidant":
        confidence = Math.min(95, Math.max(5,
          (inputValues[1] * 9.1 + inputValues[3] * 5.8 + inputValues[7] * 6.9) / 3 + 
          Math.random() * 15 - 7.5
        ));
        break;
      case "anti-inflammatory":
        confidence = Math.min(95, Math.max(5,
          (inputValues[2] * 7.8 + inputValues[4] * 8.2 + inputValues[8] * 6.5) / 3 + 
          Math.random() * 15 - 7.5
        ));
        break;
      case "antifungal":
        confidence = Math.min(95, Math.max(5,
          (inputValues[0] * 6.5 + inputValues[6] * 7.9 + inputValues[9] * 8.1) / 3 + 
          Math.random() * 15 - 7.5
        ));
        break;
      case "antibacterial":
        confidence = Math.min(95, Math.max(5,
          (inputValues[1] * 8.7 + inputValues[4] * 6.8 + inputValues[7] * 7.4) / 3 + 
          Math.random() * 15 - 7.5
        ));
        break;
      case "antiviral":
        confidence = Math.min(95, Math.max(5,
          (inputValues[3] * 7.2 + inputValues[5] * 8.0 + inputValues[8] * 6.7) / 3 + 
          Math.random() * 15 - 7.5
        ));
        break;
      case "analgesic":
        confidence = Math.min(95, Math.max(5,
          (inputValues[2] * 6.9 + inputValues[6] * 7.6 + inputValues[9] * 5.8) / 3 + 
          Math.random() * 15 - 7.5
        ));
        break;
      case "sedative":
        confidence = Math.min(95, Math.max(5,
          (inputValues[0] * 5.5 + inputValues[3] * 6.8 + inputValues[6] * 7.9) / 3 + 
          Math.random() * 15 - 7.5
        ));
        break;
      case "stimulant":
        confidence = Math.min(95, Math.max(5,
          (inputValues[1] * 7.8 + inputValues[4] * 8.5 + inputValues[7] * 6.2) / 3 + 
          Math.random() * 15 - 7.5
        ));
        break;
      case "antiseptic":
        confidence = Math.min(95, Math.max(5,
          (inputValues[5] * 8.1 + inputValues[8] * 7.3 + inputValues[9] * 6.6) / 3 + 
          Math.random() * 15 - 7.5
        ));
        break;
      default:
        confidence = Math.random() * 30 + 10;
    }
    
    // Round to 1 decimal place
    confidence = Math.round(confidence * 10) / 10;
    
    predictions.push({
      activity,
      confidence
    });
  });
  
  // Sort by confidence (highest first) and filter out very low confidence predictions
  return predictions
    .filter(p => p.confidence > 5) // Only show predictions above 5%
    .sort((a, b) => b.confidence - a.confidence);
};
