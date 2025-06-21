
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
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
              <Link to="/" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link to="/predictor" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Predictor
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Essential Oil's Biological Activity
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600"> Predictor</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Advanced machine learning tool powered by CatBoost and Random Forest algorithms to predict biological activities of essential oils based on their chemical composition and properties.
          </p>
          <Link to="/predictor">
            <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 text-lg">
              Start Prediction
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-green-600">🧬 Advanced ML Models</CardTitle>
              <CardDescription>
                Utilizes state-of-the-art CatBoost and Random Forest algorithms with multilabel classification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• CatBoost classifier with optimized hyperparameters</li>
                <li>• Random Forest for fast predictions</li>
                <li>• Threshold tuning for optimal F1-scores</li>
                <li>• Multilabel output classification</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-blue-600">⚗️ Chemical Analysis</CardTitle>
              <CardDescription>
                Predicts biological activities based on essential oil chemical composition
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• 10 key chemical parameters</li>
                <li>• Standardized feature scaling</li>
                <li>• Data balancing with oversampling</li>
                <li>• Comprehensive preprocessing pipeline</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-purple-600">📊 Accurate Predictions</CardTitle>
              <CardDescription>
                High-performance model with excellent F1-scores and accuracy metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Optimized micro and macro F1-scores</li>
                <li>• Confusion matrix analysis</li>
                <li>• Confidence-based predictions</li>
                <li>• Multiple activity classification</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* How It Works Section */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Input Parameters</h3>
              <p className="text-sm text-gray-600">Enter the 10 key chemical composition values of your essential oil</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">ML Processing</h3>
              <p className="text-sm text-gray-600">Our trained models analyze the data using advanced algorithms</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Activity Prediction</h3>
              <p className="text-sm text-gray-600">Generate predictions for multiple biological activities</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">4</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Results & Insights</h3>
              <p className="text-sm text-gray-600">View detailed predictions with confidence scores and interpretations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
