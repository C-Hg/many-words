import { Document } from "mongoose";
import { LessonsStats } from "../stats/lessons/interfaces/lessonsStats.interface";

export default interface User extends Document {
  email: string;
  googleId?: string;
  stats: {
    lessons: LessonsStats;
    topics: {};
    globalProgress: {
      studiedLessons: number;
      greenLessons: number;
      goldLessons: number;
      encounteredWords: number;
      greenWords: number;
      goldWords: number;
    };
  };
}
