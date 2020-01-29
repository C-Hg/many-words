import { Document } from "mongoose";
import { ObjectId } from "mongodb";
import FormStats from "./words/formStats.interface";

export default interface WordStats extends Document {
  userId: ObjectId;
  englishName: string;
  lesson: string;
  topic: string;
  correctAnswers: number;
  wrongAnswers: number;
  statsByForm: FormStats[];
  globalScore: number;
  updatedAt: Date;
}
