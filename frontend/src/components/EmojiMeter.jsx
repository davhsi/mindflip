import React, { useState } from "react";

const EmojiMeter = () => {
  const emojis = [
    { icon: "😡", label: "Angry" },
    { icon: "😢", label: "Sad" },
    { icon: "😐", label: "Neutral" },
    { icon: "😊", label: "Happy" },
    { icon: "😂", label: "Excited" },
  ];

  // Initialize state to store the slider value (0-100)
  const [sliderValue, setSliderValue] = useState(50);

  // Handle slider change
  const handleSliderChange = (e) => {
    setSliderValue(Number(e.target.value));
  };

  // Get emotion based on the slider value
  const getEmotion = () => {
    if (sliderValue < 20) return "Angry";
    if (sliderValue < 40) return "Sad";
    if (sliderValue < 60) return "Neutral";
    if (sliderValue < 80) return "Happy";
    return "Excited";
  };

  return (
    <div className="flex flex-col items-center space-y-6 bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-xl">
      <h2 className="text-xl font-semibold text-gray-800">How do you feel?</h2>
      
      {/* Emoji meter container */}
      <div className="relative w-full">
        {/* Slider */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderValue}
          onChange={handleSliderChange}
          className="w-full"
        />

        {/* Emoji labels spaced across the meter */}
        <div className="absolute top-0 left-0 right-0 flex justify-between px-2 text-sm text-gray-600">
          {emojis.map((emoji, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-3xl">{emoji.icon}</span>
              <p>{emoji.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Emotion state */}
      <p className="text-center text-lg text-gray-700 mt-4">{`Emotion: ${getEmotion()}`}</p>

      {/* Submit Button */}
      <button className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
        Submit
      </button>
    </div>
  );
};

export default EmojiMeter;
