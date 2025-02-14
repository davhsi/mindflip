import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Recommendations = () => {
  const [emotion, setEmotion] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); // To get state passed from Home page

  useEffect(() => {
    // Check if the emotion was passed through navigation state
    if (location.state && location.state.emotion) {
      setEmotion(location.state.emotion);
      setFeedbackText(location.state.feedbackText || ""); // Optional: You can pass feedbackText from Home as well
    } else {
      navigate("/"); // If no emotion is passed, navigate back to Home
    }
  }, [location, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-200 p-4">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Your Emotion</h1>
      <p className="text-lg text-gray-600 mb-6 text-center">
        Based on your feedback, we detected your emotion!
      </p>

      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-lg flex flex-col items-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Emotion Detected: {emotion ? emotion : "Loading..."}
        </h2>

      
        {/* You can integrate the book API here using emotion */}
      </div>
    </div>
  );
};

export default Recommendations;
