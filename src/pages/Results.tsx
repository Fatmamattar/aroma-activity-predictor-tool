
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

interface PredictionResult {
  activity: string;
  confidence: number;
}

interface LocationState {
  predictions: PredictionResult[];
  inputValues: number[];
  inputLabels: string[];
}

const Results = () => {
  const location = useLocation();
  const state = location.state as LocationState;
  const [animationTrigger, setAnimationTrigger] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => setAnimationTrigger(true), 100);
  }, []);

  if (!state) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Results Available</h2>
            <p className="text-gray-600 mb-6">Please run a prediction first.</p>
            <Link to="/predictor">
              <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                Go to Predictor
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { predictions, inputValues, inputLabels } = state;
  const highConfidencePredictions = predictions.filter(p => p.confidence >= 50);
  const mediumConfidencePredictions = predictions.filter(p => p.confidence >= 20 && p.confidence < 50);
  const lowConfidencePredictions = predictions.filter(p => p.confidence < 20);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 70) return "text-green-600";
    if (confidence >= 50) return "text-yellow-600";
    if (confidence >= 30) return "text-orange-600";
    return "text-red-600";
  };

  const getConfidenceBadgeVariant = (confidence: number): "default" | "secondary" | "destructive" | "outline" => {
    if (confidence >= 70) return "default";
    if (confidence >= 50) return "secondary";
    if (confidence >= 30) return "outline";
    return "destructive";
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
              <Link to="/predictor" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Predictor
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link to="/predictor" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Predictor
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Prediction <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">Results</span>
          </h1>
          <p className="text-lg text-gray-600">
            Analysis complete! Here are the predicted biological activities for your essential oil.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* High Confidence Predictions */}
            {highConfidencePredictions.length > 0 && (
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-green-600">🎯 High Confidence Predictions</CardTitle>
                  <CardDescription>
                    Activities with confidence ≥ 50% - Most likely biological activities
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {highConfidencePredictions.map((prediction, index) => (
                    <div 
                      key={index} 
                      className={`flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200 transition-all duration-500 ${
                        animationTrigger ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 capitalize">{prediction.activity}</h3>
                        <div className="mt-2">
                          <Progress 
                            value={prediction.confidence} 
                            className="h-2 bg-green-200" 
                          />
                        </div>
                      </div>
                      <Badge variant={getConfidenceBadgeVariant(prediction.confidence)} className="ml-4">
                        {prediction.confidence}%
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Medium Confidence Predictions */}
            {mediumConfidencePredictions.length > 0 && (
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-yellow-600">⚠️ Medium Confidence Predictions</CardTitle>
                  <CardDescription>
                    Activities with confidence 20-49% - Possible biological activities
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mediumConfidencePredictions.map((prediction, index) => (
                    <div 
                      key={index} 
                      className={`flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200 transition-all duration-500 ${
                        animationTrigger ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                      }`}
                      style={{ transitionDelay: `${(highConfidencePredictions.length + index) * 100}ms` }}
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 capitalize">{prediction.activity}</h3>
                        <div className="mt-2">
                          <Progress 
                            value={prediction.confidence} 
                            className="h-2 bg-yellow-200" 
                          />
                        </div>
                      </div>
                      <Badge variant={getConfidenceBadgeVariant(prediction.confidence)} className="ml-4">
                        {prediction.confidence}%
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Low Confidence Predictions */}
            {lowConfidencePredictions.length > 0 && (
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-600">📊 Low Confidence Predictions</CardTitle>
                  <CardDescription>
                    Activities with confidence &lt; 20% - Less likely but worth noting
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {lowConfidencePredictions.map((prediction, index) => (
                    <div 
                      key={index} 
                      className={`flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 transition-all duration-500 ${
                        animationTrigger ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                      }`}
                      style={{ transitionDelay: `${(highConfidencePredictions.length + mediumConfidencePredictions.length + index) * 100}ms` }}
                    >
                      <span className="font-medium text-gray-700 capitalize text-sm">{prediction.activity}</span>
                      <Badge variant="outline" className="text-xs">
                        {prediction.confidence}%
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - Input Summary & Interpretation */}
          <div className="space-y-6">
            {/* Input Summary */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">📋 Input Parameters</CardTitle>
                <CardDescription>
                  The chemical composition values you provided
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {inputValues.map((value, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">{inputLabels[index]}:</span>
                    <span className="font-medium text-gray-900">{value.toFixed(1)}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Interpretation Guide */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">🧠 Interpretation Guide</CardTitle>
                <CardDescription>
                  Understanding your results
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold text-green-600 mb-2">High Confidence (≥50%)</h4>
                  <p className="text-gray-600">Strong evidence for these biological activities based on the chemical composition.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-600 mb-2">Medium Confidence (20-49%)</h4>
                  <p className="text-gray-600">Moderate likelihood. Consider these activities for further investigation.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-600 mb-2">Low Confidence (&lt;20%)</h4>
                  <p className="text-gray-600">Lower probability, but may be worth noting for comprehensive analysis.</p>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link to="/predictor" className="block">
                <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                  New Prediction
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => window.print()}
              >
                Print Results
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
