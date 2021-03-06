import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: false },
    googleId: { type: String, required: false },
    stats: {
      type: Object,
      required: true,
      default: {
        lessons: {},
        themes: {},
        globalProgress: {}
      }
    }
  },
  { minimize: false }
);

export default mongoose.model("User", userSchema);
