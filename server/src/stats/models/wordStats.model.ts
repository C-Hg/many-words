import mongoose from "mongoose";

import { WordStatsDocument } from "../interfaces/wordStats.interface";

const { Schema } = mongoose;

const wordStatsSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    englishName: { type: String, required: true },
    lesson: { type: String, required: true },
    topic: { type: String, required: true },
    correctAnswers: { type: Number, default: 0, required: true },
    wrongAnswers: { type: Number, default: 0, required: true },
    statsByForm: {
      type: [{ language: String, form: String, score: Number, _id: false }],
      required: true,
    },
    globalScore: { type: Number, default: 0, required: true },
    declineFactor: { type: Number, default: 1, required: true },
    updatedAt: { type: Date, default: Date.now(), required: true },
  },
  {
    toObject: { getters: true },
    timestamps: { createdAt: false, updatedAt: true },
  }
);

const WordStatsModel = mongoose.model<WordStatsDocument>(
  "WordStats",
  wordStatsSchema
);
export default WordStatsModel;
