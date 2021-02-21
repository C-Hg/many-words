import { ObjectId } from "mongodb";
import { Document } from "mongoose";

import FormStats from "./formStats.interface";

import { Lesson, Topic } from "../../graphql/types";

export interface WordStats {
  userId: ObjectId;
  englishName: string;
  lesson: Lesson;
  topic: Topic;
  correctAnswers: number;
  wrongAnswers: number;
  score: number;
  formsStats: FormStats[];
}

export interface WordStatsDocument extends Document, WordStats {}
