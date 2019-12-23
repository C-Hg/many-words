import mongoose from "mongoose";

const { Schema } = mongoose;

const wordSchema = new Schema({
  english: {
    reference: { type: String, required: true },
    forms: { type: Array, required: true },
  },
  french: {
    reference: { type: String, required: true },
    forms: { type: Array, required: true },
  },
  hasUniqueForm: { type: Boolean, required: false },
  type: { type: String, required: true },
  lesson: { type: String, required: true },
  topic: { type: String, required: true },
});

export default mongoose.model("Word", wordSchema);
