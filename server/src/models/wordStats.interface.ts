import { Document } from "mongoose";
import { ObjectId } from "mongodb";

interface FormStats {
  language: string;
  form: string;
  score: number;
}

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

/*
statsByForm is an array of objects
[{language, acceptedForm, statsIndex}, {...}]

*/
