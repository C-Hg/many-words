import { Document } from "mongoose";
import { ObjectID } from "mongodb";

export default interface User extends Document {
  id: ObjectID;
  email: string;
  googleId?: string;
  stats: {
    lessons: {};
    themes: {};
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
