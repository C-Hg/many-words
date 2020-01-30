import { Document } from "mongoose";
import { ObjectId } from "mongodb";
import FormStats from "./formStats.interface";
import { Lesson } from "../../../lessons/models/lesson.type";
import { Topic } from "../../../lessons/models/topic.type";

export default interface WordStats extends Document {
  userId: ObjectId;
  englishName: string;
  lesson: Lesson;
  topic: Topic;
  correctAnswers: number;
  wrongAnswers: number;
  statsByForm: FormStats[];
  globalScore: number;
  updatedAt: Date;
}
