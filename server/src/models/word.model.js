const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const wordSchema = new Schema({
  enName: { type: String, required: true },
  frName: { type: String, required: true },
  hasUniqueForm: { type: Boolean, required: false },
  type: { type: String, required: true },
  lesson: { type: String, required: true },
  theme: { type: String, required: true },
  en: { type: Array, required: true },
  fr: { type: Array, required: true }
});

export default mongoose.model("Word", wordSchema);
