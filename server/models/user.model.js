const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: false },
  name: { type: String, required: false },
  googleId: { type: String, required: false },
  facebookId: { type: String, required: false }
});

module.exports = mongoose.model("User", userSchema);
