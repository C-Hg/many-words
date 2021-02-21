import { Document } from "mongoose";

import { CurriculumNames } from "../../graphql/types";
import { NextExerciseMode } from "../constants";

export interface NextExercise {
  mode: NextExerciseMode;
  ressourceId: string;
}

export interface Curriculum {
  exercisesSinceWeakWords: number;
  lessons: Lessons[];
  name: CurriculumNames;
  nextExercise: NextExercise;
  userId: string;
}

export interface CurriculumDocument extends Curriculum, Document {}
