import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Home = () => {
  const [sliderValue, setSliderValue] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [predictedEmotion, setPredictedEmotion] = useState(null);

  const navigate = useNavigate(); // Initialize navigate function

  const moodOptions = [
    { label: "Angry", emoji: "😠", range: [0, 20] },
    { label: "Sad", emoji: "😔", range: [21, 40] },
    { label: "Neutral", emoji: "😐", range: [41, 60] },
    { label: "Happy", emoji: "😊", range: [61, 80] },
    { label: "Excited", emoji: "😃", range: [81, 100] },
  ];

  const getSelectedMood = () => {
    return moodOptions.find(
      (mood) => sliderValue >= mood.range[0] && sliderValue <= mood.range[1]
    );
  };

  const handleSliderChange = (e) => {
    setSliderValue(Number(e.target.value));
  };

  const handleSubmit = async () => {
    const selectedMood = getSelectedMood();
    if (selectedMood) {
      const textToSend = feedbackText || selectedMood.label;

      try {
        const response = await fetch("https://233b-34-147-69-34.ngrok-free.app/predict", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: textToSend }),
        });

        const data = await response.json();

        if (response.ok) {
          setPredictedEmotion(data.emotion);
          // Directly navigate to the Recommendations page
          navigate("/recommendations", { state: { emotion: data.emotion } });
        } else {
          alert("Failed to predict emotion.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      alert("Please adjust the slider to select a mood.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-200 p-4">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Welcome to MindFlip</h1>
      <p className="text-lg text-gray-600 mb-6 text-center">
        A personalized mental health recommendation system just for you!
      </p>

      <div className="bg-blue-200 p-6 rounded-xl shadow-2xl w-full max-w-lg flex flex-col items-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">How do you feel?</h2>

        {/* Slider Container */}
        <div className="relative w-full mt-4">
          <input
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={handleSliderChange}
            className="w-full h-3 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, rgb(39, 8, 116) ${sliderValue}%, #ccc ${sliderValue}%)`,
            }}
          />

          {/* Mood Emojis Below Slider */}
          <div className="flex justify-between px-2 text-lg text-gray-800 mt-4">
            {moodOptions.map((mood, index) => (
              <div key={index} className="flex flex-col items-center">
                <span className="text-3xl">{mood.emoji}</span>
                <p className="text-sm">{mood.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback Textbox */}
        <textarea
          className="w-full border border-gray-700 p-2 rounded mt-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your feedback here..."
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          rows="4"
        />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="mt-6 w-60 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Home;
