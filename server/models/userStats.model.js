const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userStatsSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    lessonStats: { type: Object, required: true, default: {} },
    themeStats: { type: Object, required: true, default: {} }
  },
  { minimize: false }
);

module.exports = mongoose.model("UserStats", userStatsSchema);
