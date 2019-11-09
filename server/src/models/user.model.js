import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: false },
    googleId: { type: String, required: false },
    stats: {
      type: Schema.Types.Mixed,
      default: {
        lessons: {},
        themes: {},
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
  { minimize: false }
);

export default mongoose.model("User", userSchema);
