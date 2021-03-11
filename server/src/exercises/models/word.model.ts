import mongoose from "mongoose";

import { WordDocument } from "../types/word.interface";

const { Schema } = mongoose;

const WordSchema = new Schema({
  english: {
    name: { type: String, required: true },
    words: [
      {
        form: {
          type: String,
          required: true,
        },
        values: [
          {
            type: String,
            required: true,
          },
        ],
      },
    ],
  },
  french: {
    name: { type: String, required: true },
    words: [
      {
        form: {
          type: String,
          required: true,
        },
        values: [
          {
            type: String,
            required: true,
          },
        ],
      },
    ],
  },
  hasUniqueForm: { type: Boolean, required: true, default: false },
  type: { type: String, required: true },
  lesson: { type: String, required: true },
  topic: { type: String, required: true },
});

const WordModel = mongoose.model<WordDocument>("Word", WordSchema);

export default WordModel;
