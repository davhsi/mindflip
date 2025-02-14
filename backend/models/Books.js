const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  emotionTags: [String],  // Tags related to the emotion (happy, sad, etc.)
});

module.exports = mongoose.model("Book", bookSchema);
