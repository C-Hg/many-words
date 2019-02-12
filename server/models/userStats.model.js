const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userStatsSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  lessonStats: { type: Schema.Types.Mixed, required: false }
});

module.exports = mongoose.model("UserStats", userStatsSchema);
