import { ObjectId } from "mongodb";
import mongoose from "mongoose";

import { CurriculumNames, NextExerciseMode } from "../constants";

const { Schema } = mongoose;

// TODO: complete Lessons schema

const curriculumSchema = new Schema(
  {
    exercisesSinceWeakWords: {
      default: 0,
      required: true,
      type: Number,
    },
    lessons: {
      default: [],
      required: true,
      type: Lessons,
    },
    name: {
      enum: CurriculumNames,
      required: true,
      type: String,
    },
    nextExercise: {
      mode: {
        enum: NextExerciseMode,
        required: true,
        type: String,
      },
      ressourceId: {
        required: true,
        type: String,
      },
    },
    userId: {
      required: true,
      type: ObjectId,
    },
  },
  {
    toObject: { getters: true },
    timestamps: { createdAt: true, updatedAt: true },
  }
);

const Curriculum = mongoose.model<CurriculumDocument>(
  "Curriculum",
  curriculumSchema
);

export default Curriculum;
