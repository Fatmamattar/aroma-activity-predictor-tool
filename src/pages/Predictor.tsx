
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { predictActivities } from "@/utils/mlPredictor";

const Predictor = () => {
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState<number[]>(new Array(10).fill(0));
  const [isLoading, setIsLoading] = useState(false);

  // Use the top 10 features for input (matching your original Colab code)
  const inputLabels = [
    "α-Pinene",
    "Camphene", 
    "β-Pinene",
    "Myrcene",
    "α-Phellandrene",
    "α-Terpinene",
    "Limonene",
    "β-Phellandrene",
    "γ-Terpinene",
    "α-Terpinolene"
  ];

  const handleSliderChange = (index: number, value: number[]) => {
    const newValues = [...inputValues];
    newValues[index] = value[0];
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
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('https://i.postimg.cc/qgfpzrmm/projectimage.jpg')"
      }}
    >
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
        <Link to="/" className="inline-flex items-center text-white hover:text-gray-200 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 text-shadow-lg">
            Essential Oil Activity <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">Predictor</span>
          </h1>
          <p className="text-lg text-white">
            Enter the chemical composition parameters of your essential oil to predict its biological activities
          </p>
        </div>

        {/* Input Form */}
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">Chemical Composition Parameters</CardTitle>
            <CardDescription>
              Use the sliders to set values between 0 and 10 for each chemical parameter
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {inputLabels.map((label, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label htmlFor={`param-${index}`} className="text-sm font-medium text-gray-700">
                      {label}
                    </Label>
                    <span className="text-sm font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded">
                      {inputValues[index].toFixed(1)}
                    </span>
                  </div>
                  <Slider
                    id={`param-${index}`}
                    min={0}
                    max={10}
                    step={0.1}
                    value={[inputValues[index]]}
                    onValueChange={(value) => handleSliderChange(index, value)}
                    className="w-full"
                  />
                </div>
              ))}
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
        <Card className="mt-8 border-0 shadow-lg bg-blue-50/90 backdrop-blur-sm border-blue-200">
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
