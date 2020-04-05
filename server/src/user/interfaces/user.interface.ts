import { Document } from "mongoose";

import { LessonsStats } from "../../stats/interfaces/lessonsStats.interface";
import { TopicsStats } from "../../stats/interfaces/topicsStats.interface";

export interface User {
  email: string;
  googleId?: string;
  stats: {
    lessons: Partial<LessonsStats>;
    topics: Partial<TopicsStats>;
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
