import { useState } from "react";

export default function Index() {
  const [userInput, setUserInput] = useState("");
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);

  async function handlePredict(input: string) {
    setLoading(true);
    try {
      const response = await fetch("https://fc0d858c65f3d91577.gradio.live/api/predict/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: [input], // Send input as a list to match Gradio format
        }),
      });

      const result = await response.json();
      console.log("Prediction result:", result.data);
      setPrediction(result.data[0]); // Show first prediction value

    } catch (error) {
      console.error("Prediction error:", error);
      setPrediction("Error: Failed to get prediction");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">EO Biological Activity Finder</h1>

      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Enter EO compound features (comma-separated)"
        className="w-full max-w-md p-3 rounded-lg border border-gray-300 shadow-sm mb-4"
      />

      <button
        onClick={() => handlePredict(userInput)}
        disabled={loading || userInput.trim() === ""}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "Predicting..." : "Predict"}
      </button>

      {prediction && (
        <div className="mt-6 p-4 bg-white rounded-lg shadow max-w-md text-center">
          <p className="text-xl font-medium">Prediction:</p>
          <p className="text-blue-700 text-2xl mt-2">{prediction}</p>
        </div>
      )}
    </div>
  );
}
