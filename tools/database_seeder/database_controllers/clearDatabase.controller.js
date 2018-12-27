const Word = require("../models/word.model");

exports.clearDatabase = async function() {
  try {
    await Word.deleteMany();
    return;
  } catch (e) {
    if (e)
      console.log(
        "\033[1;31m" + "Error while clearing the database" + "\033[0;0m"
      );
  }
};
