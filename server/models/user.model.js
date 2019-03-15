const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: { type: String, required: false },
    name: { type: String, required: false },
    googleId: { type: String, required: false },
    facebookId: { type: String, required: false },
    lessonsStats: { type: Object, required: true, default: {} },
    themesStats: { type: Object, required: true, default: {} },
    globalProgress: { type: Object, required: true, default: {} }
  },
  { minimize: false }
);

module.exports = mongoose.model("User", userSchema);
