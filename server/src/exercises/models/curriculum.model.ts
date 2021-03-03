import mongoose from "mongoose";

import { CurriculumNames, NextExerciseMode } from "../constants";
import { CurriculumDocument } from "../interfaces/curriculum.interface";

const { Schema } = mongoose;

const CurriculumSchema = new Schema(
  {
    exercisesSinceWeakWords: {
      default: 0,
      required: true,
      type: Number,
    },
    lessons: [
      {
        completion: {
          type: Number,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
      },
    ],
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
      type: Schema.Types.ObjectId,
    },
  },
  {
    toObject: { getters: true },
    timestamps: { createdAt: true, updatedAt: true },
  }
);

const CurriculumModel = mongoose.model<CurriculumDocument>(
  "Curriculum",
  CurriculumSchema
);

export default CurriculumModel;
