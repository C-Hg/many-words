import { Document } from "mongoose";

import EnglishWord from "./englishWord.interface";
import FrenchWord from "./frenchWord.interface";

import FormStats from "../../stats/interfaces/formStats.interface";
import { Lesson } from "../models/lesson.type";
import { Topic } from "../models/topic.type";

export interface Word {
  english: {
    name: string;
    words: EnglishWord[];
  };
  french: {
    name: string;
    words: FrenchWord[];
  };
  hasUniqueForm: boolean;
  type: string;
  lesson: Lesson;
  topic: Topic;
  weakestForms?: FormStats[];
}

export interface WordDocument extends Document, Word {}
