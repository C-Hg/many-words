import mongoose from "mongoose";
import WordInterface from "../interfaces/word.interface";

const { Schema } = mongoose;

const WordSchema = new Schema({
  english: {
    name: { type: String, required: true },
    words: { type: Array, required: true },
  },
  french: {
    name: { type: String, required: true },
    words: { type: Array, required: true },
  },
  hasUniqueForm: { type: Boolean, required: true, default: false },
  type: { type: String, required: true },
  lesson: { type: String, required: true },
  topic: { type: String, required: true },
});

const WordModel = mongoose.model<WordInterface>("Word", WordSchema);

export default WordModel;
