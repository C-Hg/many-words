const mongoose = require("mongoose");

const { Schema } = mongoose;

const wordSchema = new Schema({
  english: {
    name: { type: String, required: true },
    words: { type: Array, required: true },
  },
  french: {
    name: { type: String, required: true },
    words: { type: Array, required: true },
  },
  hasUniqueForm: { type: Boolean, required: false },
  type: { type: String, required: true },
  lesson: { type: String, required: true },
  topic: { type: String, required: true },
});

module.exports = mongoose.model("Word", wordSchema);
