import { ObjectID } from "mongodb";
import mongoose from "mongoose";

import { UserDocument } from "../interfaces/user.interface";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    id: ObjectID,
    email: { type: String, required: true },
    googleId: { type: String, required: false },
    stats: {
      type: Schema.Types.Mixed,
      default: {
        lessons: {},
        topics: {},
        globalProgress: {
          studiedLessons: 0,
          greenLessons: 0,
          goldLessons: 0,
          encounteredWords: 0,
          greenWords: 0,
          goldWords: 0,
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
