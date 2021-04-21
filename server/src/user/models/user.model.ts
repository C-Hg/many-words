import mongoose from "mongoose";

import { UserDocument } from "../interfaces/user.interface";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, required: false, default: "" },
    language: { type: String, required: false, default: null },
    login: {
      expiresAt: {
        type: Number,
        required: false,
      },
      totp: {
        type: Number,
        required: false,
      },
    },
    verifyEmail: {
      emailToVerify: {
        type: String,
        required: false,
      },
      expiresAt: {
        type: Number,
        required: false,
      },
      totp: {
        type: Number,
        required: false,
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
