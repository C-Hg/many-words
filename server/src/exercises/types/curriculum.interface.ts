import { ObjectID } from "mongodb";
import { Document } from "mongoose";

export enum CurriculumNames {
  frenchEnglish = "frenchEnglish",
}

export enum NextExerciseMode {
  quiz = "quiz",
}

export interface NextExercise {
  mode: NextExerciseMode;
  ressourceId: string;
}

export interface LessonCompletion {
  completion: number;
  name: string;
}

export interface Curriculum {
  exercisesSinceWeakWords: number;
  lessons: LessonCompletion[];
  name: CurriculumNames;
  nextExercise: NextExercise;
  userId: ObjectID;
}

export interface CurriculumDocument extends Curriculum, Document {}
