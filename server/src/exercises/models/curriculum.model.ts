import mongoose from "mongoose";

import {
  CurriculumDocument,
  CurriculumNames,
  NextExerciseMode,
} from "../types/curriculum.interface";

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
    stats: {
      globalProgress: {
        type: Number,
        default: 0,
      },
      goldLessons: {
        type: Number,
        default: 0,
      },
      goldWords: {
        type: Number,
        default: 0,
      },
      greenLessons: {
        type: Number,
        default: 0,
      },
      greenWords: {
        type: Number,
        default: 0,
      },
      studiedWords: {
        type: Number,
        default: 0,
      },
      studiedLessons: {
        type: Number,
        default: 0,
      },
    },
    userId: {
      ref: "User",
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
