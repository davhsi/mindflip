const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/auth"); // Import auth routes

dotenv.config();
const app = express();

// Middleware to parse JSON body of requests
app.use(express.json());

// Allow CORS for specific origin and methods (especially POST)
const corsOptions = {
  origin: 'http://localhost:5173',  // React's development server
  methods: ['POST'],               // Allow POST request method
  allowedHeaders: ['Content-Type'], // Ensure Content-Type is allowed
};

app.use(cors(corsOptions)); // Apply CORS settings

// POST Route for emotion prediction (Main POST request)
app.post('/predict', (req, res) => {
  const { text } = req.body;
  
  // Simulated response, replace with actual prediction logic
  const emotion = "joy";  // Just a placeholder prediction
  
  res.json({ emotion }); // Respond with emotion prediction
});

// Routes for authentication
app.use("/api", authRoutes); // Mount auth routes at /api/auth

// MongoDB Connection (optional, if you have MongoDB setup)
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Failed:", err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
