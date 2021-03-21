import { ObjectID } from "mongodb";
import { Document } from "mongoose";

import { CurriculumStats, Lesson, NextExercise } from "../../graphql/types";

export enum CurriculumNames {
  FrenchEnglish = "frenchEnglish",
}

export enum NextExerciseMode {
  Quiz = "quiz",
}
export interface LessonCompletion {
  completion: number;
  name: Lesson;
}

// this interface is meant only for server-side operations
export interface Curriculum {
  exercisesSinceWeakWords: number;
  lessons: LessonCompletion[];
  name: CurriculumNames;
  nextExercise: NextExercise;
  stats: CurriculumStats;
  userId: ObjectID;
}

export interface CurriculumDocument extends Curriculum, Document {}
