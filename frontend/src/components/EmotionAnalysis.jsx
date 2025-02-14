import { useState } from "react";
import axios from "axios";
import BookRecommendations from "./BookRecommendations";

const EmotionAnalysis = () => {
  const [textInput, setTextInput] = useState("");
  const [emojiRating, setEmojiRating] = useState(0);
  const [recommendedBooks, setRecommendedBooks] = useState([]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/emotion/analyze", 
        { text: textInput, emojiRating }
      );
      setRecommendedBooks(response.data.books);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  return (
    <div>
      <textarea
        placeholder="Enter text..."
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
      />
      <div>
        <label>Emoji Rating:</label>
        <input 
          type="number" 
          value={emojiRating} 
          onChange={(e) => setEmojiRating(e.target.value)} 
          min="0" max="5"
        />
      </div>
      <button onClick={handleSubmit}>Submit</button>

      {recommendedBooks.length > 0 && <BookRecommendations books={recommendedBooks} />}
    </div>
  );
};

export default EmotionAnalysis;
