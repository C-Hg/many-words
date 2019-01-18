const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wordProficiencySchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  word_en_name: { type: String, required: true },
  correctAnswers: { type: Number, default: 0, required: true },
  wrongAnswers: { type: Number, default: 0, required: true },
  proficiencyIndexes: { type: Array, required: true },
  generalProficiency: { type: Number, default: 0, required: true },
  declineFactor: { type: Number, default: 1, required: true },
  updatedAt: { type: Date, default: Date.now(), required: true }
});

module.exports = mongoose.model("Word", wordProficiencySchema);

/*
proficiencyIndexes is an array of arrays
[[language, acceptedForm, proficiencyIndex], [...]]

*/
