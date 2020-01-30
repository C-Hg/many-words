import { Document } from "mongoose";
import { ObjectId } from "mongodb";
import FormStats from "./formStats.interface";
import { Lesson } from "../../../lessons/models/lessons.type";

export default interface WordStats extends Document {
  userId: ObjectId;
  englishName: string;
  lesson: Lesson;
  topic: string;
  correctAnswers: number;
  wrongAnswers: number;
  statsByForm: FormStats[];
  globalScore: number;
  updatedAt: Date;
}
