const path = require("path");
const { gatherData } = require("./main_functions/gatherData.function");

const curriculumDirectory = "../../exercises/FR-EN/";
//returns an array of word objects

(async function seedDatabase() {
  let words = await gatherData(curriculumDirectory);
  if (words) {
    console.log(
      "\033[1;32m" +
        "Data successfully retrieved from Markdown documents! ☺️" +
        "\033[0;0m"
    );
  } else {
    console.error(
      "\033[1;32m" +
        "There was a problem while retrieving data from Markdown documents, check the logs. 💣" +
        "\033[0;0m"
    );
  }
  console.log(words);
})();
