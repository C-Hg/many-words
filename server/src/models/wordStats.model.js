const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wordStatsSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  en_name: { type: String, required: true },
  lesson: { type: String, required: true },
  theme: { type: String, required: true },
  correctAnswers: { type: Number, default: 0, required: true },
  wrongAnswers: { type: Number, default: 0, required: true },
  stats_by_form: {
    type: [{ language: String, form: String, score: Number, _id: false }],
    required: true
  },
  global_score: { type: Number, default: 0, required: true },
  declineFactor: { type: Number, default: 1, required: true },
  updatedAt: { type: Date, default: Date.now(), required: true }
});

module.exports = mongoose.model("WordStats", wordStatsSchema);

/*
stats_by_form is an array of objects
[{language, acceptedForm, statsIndex}, {...}]

*/
