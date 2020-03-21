import { Document } from "mongoose";
import { ObjectID } from "mongodb";
import { LessonsStats } from "../../exercises/lessons/interfaces/lessonsStats.interface";

export default interface User extends Document {
  id: ObjectID;
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
