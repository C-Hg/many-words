import { ObjectId } from "mongodb";
import { Document } from "mongoose";

import FormStats from "./formStats.interface";

import { Lesson } from "../../exercises/models/lesson.type";
import { Topic } from "../../exercises/models/topic.type";

export interface WordStats {
  userId: ObjectId;
  englishName: string;
  lesson: Lesson;
  topic: Topic;
  correctAnswers: number;
  wrongAnswers: number;
  statsByForm: FormStats[];
  globalScore: number;
}

export interface WordStatsDocument extends Document, WordStats {}
