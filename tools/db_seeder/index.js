const path = require("path");
const { gatherData } = require("./main_functions/gatherData.function");

const curriculumDirectory = "../../exercises/FR-EN/";
//returns an array of word objects

(async function seedDatabase() {
  let words = await gatherData(curriculumDirectory);
  console.log(words);
})();
