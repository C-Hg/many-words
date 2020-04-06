import { Document } from "mongoose";

import GlobalStats from "../../stats/interfaces/globalStats.interface";
import { LessonsStats } from "../../stats/interfaces/lessonsStats.interface";
import { TopicsStats } from "../../stats/interfaces/topicsStats.interface";

export interface User {
  email: string;
  googleId?: string;
  stats: {
    lessons: Partial<LessonsStats>;
    topics: Partial<TopicsStats>;
    global: GlobalStats;
  };
}

export interface UserDocument extends Document, User {}
