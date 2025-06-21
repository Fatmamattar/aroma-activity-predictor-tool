
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { predictActivities } from "@/utils/mlPredictor";

const Predictor = () => {
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState<number[]>(new Array(10).fill(0));
  const [isLoading, setIsLoading] = useState(false);

  const inputLabels = [
    "Chemical Parameter 1",
    "Chemical Parameter 2", 
    "Chemical Parameter 3",
    "Chemical Parameter 4",
    "Chemical Parameter 5",
    "Chemical Parameter 6",
    "Chemical Parameter 7",
    "Chemical Parameter 8",
    "Chemical Parameter 9",
    "Chemical Parameter 10"
  ];

  const handleInputChange = (index: number, value: string) => {
    const numValue = parseFloat(value) || 0;
    const newValues = [...inputValues];
    newValues[index] = Math.max(0, Math.min(10, numValue)); // Clamp between 0-10
    setInputValues(newValues);
  };

  const handlePredict = async () => {
    setIsLoading(true);
    try {
      // Simulate ML prediction processing time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const results = predictActivities(inputValues);
      
      // Navigate to results page with the prediction data
      navigate('/results', { 
        state: { 
          predictions: results,
          inputValues: inputValues,
          inputLabels: inputLabels
        } 
      });
    } catch (error) {
      console.error("Prediction error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">EO Activity Predictor</h1>
            </div>
            <div className="flex space-x-4">
              <Link to="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link to="/predictor" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Predictor
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Essential Oil Activity <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">Predictor</span>
          </h1>
          <p className="text-lg text-gray-600">
            Enter the chemical composition parameters of your essential oil to predict its biological activities
          </p>
        </div>

        {/* Input Form */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">Chemical Composition Parameters</CardTitle>
            <CardDescription>
              Please enter values between 0 and 10 for each chemical parameter
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {inputLabels.map((label, index) => (
                <div key={index} className="space-y-2">
                  <Label htmlFor={`param-${index}`} className="text-sm font-medium text-gray-700">
                    {label}
                  </Label>
                  <Input
                    id={`param-${index}`}
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={inputValues[index]}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.0"
                  />
                </div>
              ))}
            </div>

            {/* Quick Presets */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Presets</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  onClick={() => setInputValues([2.5, 3.1, 1.8, 4.2, 2.9, 3.7, 2.1, 3.5, 2.8, 3.3])}
                  className="text-sm"
                >
                  Sample Oil A
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setInputValues([4.1, 2.7, 3.9, 2.3, 4.5, 2.8, 3.6, 2.9, 4.1, 2.5])}
                  className="text-sm"
                >
                  Sample Oil B
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setInputValues([1.9, 4.3, 2.6, 3.8, 2.1, 4.2, 3.1, 2.7, 3.4, 4.0])}
                  className="text-sm"
                >
                  Sample Oil C
                </Button>
              </div>
            </div>

            {/* Predict Button */}
            <div className="flex justify-center pt-6">
              <Button
                onClick={handlePredict}
                disabled={isLoading}
                size="lg"
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-12 py-4 text-lg"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    Predict Activities
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Information Box */}
        <Card className="mt-8 border-0 shadow-lg bg-blue-50/80 backdrop-blur-sm border-blue-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">About the Prediction Model</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
              <div>
                <h4 className="font-medium mb-2">Algorithm Details:</h4>
                <ul className="space-y-1">
                  <li>• CatBoost multilabel classifier</li>
                  <li>• Random Forest for fast inference</li>
                  <li>• Optimized threshold tuning</li>
                  <li>• Feature standardization</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Model Performance:</h4>
                <ul className="space-y-1">
                  <li>• High F1-scores achieved</li>
                  <li>• Confusion matrix validated</li>
                  <li>• Multilabel prediction capability</li>
                  <li>• Confidence-based results</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Predictor;
