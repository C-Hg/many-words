import mongoose from "mongoose";

import { UserDocument } from "../interfaces/user.interface";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    googleId: { type: String, required: false },
    stats: {
      lessons: {
        type: Object,
        default: {},
      },
      topics: {
        type: Object,
        required: true,
        default: [],
      },
      global: {
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
    },
  },
  {
    minimize: false,
    toObject: { getters: true },
    timestamps: { createdAt: true, updatedAt: true },
  }
);

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
