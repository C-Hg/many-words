import { ObjectId } from "mongodb";
import { Document } from "mongoose";

import FormStats from "./formStats.interface";

import { Lesson } from "../../exercises/interfaces/lesson.type";
import { Topic } from "../../exercises/interfaces/topic.type";

export interface WordStats {
  userId: ObjectId;
  englishName: string;
  lesson: Lesson;
  topic: Topic;
  correctAnswers: number;
  wrongAnswers: number;
  globalScore: number;
  formsStats: FormStats[];
}

export interface WordStatsDocument extends Document, WordStats {}
