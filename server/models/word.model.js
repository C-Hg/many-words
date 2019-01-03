const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wordSchema = new Schema({
  en_name: { type: String, required: true },
  fr_name: { type: String, required: true },
  hasUniqueForm: { type: Boolean, required: false },
  type: { type: String, required: true },
  lessonName: { type: String, required: true },
  en: { type: Array, required: true },
  fr: { type: Array, required: true }
});

module.exports = mongoose.model("Word", wordSchema);
