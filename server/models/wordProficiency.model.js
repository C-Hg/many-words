const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wordProficiencySchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  en_name: { type: String, required: true },
  lesson: { type: String, required: true },
  theme: { type: String, required: true },
  correctAnswers: { type: Number, default: 0, required: true },
  wrongAnswers: { type: Number, default: 0, required: true },
  proficiencyIndexes: {
    type: [{ language: String, form: String, proficiency: Number, _id: false }],
    required: true
  },
  generalProficiency: { type: Number, default: 0, required: true },
  declineFactor: { type: Number, default: 1, required: true },
  updatedAt: { type: Date, default: Date.now(), required: true }
});

module.exports = mongoose.model("WordProficiency", wordProficiencySchema);

/*
proficiencyIndexes is an array of arrays
[[language, acceptedForm, proficiencyIndex], [...]]

*/
