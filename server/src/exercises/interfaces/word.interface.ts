import { Document } from "mongoose";

import EnglishWord from "./englishWord.interface";
import FrenchWord from "./frenchWord.interface";
import { Lesson } from "./lesson.type";
import { Topic } from "./topic.type";

import FormStats from "../../stats/interfaces/formStats.interface";

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
