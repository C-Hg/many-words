const { gatherData } = require("./main_functions/gatherData.function");
const curriculumDirectory = "../../exercises/FR-EN/";

//returns an array of word objects
(async function seedDatabase() {
  let words;
  try {
    words = await gatherData(curriculumDirectory);
  } catch (e) {
    console.error(
      "\033[1;32m" +
        "Error while gathering data from curriculum directory" +
        "\033[0;0m"
    );
  }
  if (words) {
    console.error(
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
  try {
    await clearDatabase();
  } catch (e) {
    console.error("\033[1;32m" + "Error while clearing database" + "\033[0;0m");
  }
  try {
    await seedWordsInDatabase();
  } catch (e) {
    console.error(
      "\033[1;32m" + "Error while seeding words database" + "\033[0;0m"
    );
  }
})();
