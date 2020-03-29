import { Document } from "mongoose";

import { LessonsStats } from "../../stats/interfaces/lessonsStats.interface";

export interface User {
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

export interface UserDocument extends Document, User {}
