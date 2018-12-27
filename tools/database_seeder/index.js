const {
  gatherData
} = require("./markdown_fetching_functions/gatherData.function");
const {
  clearDatabase
} = require("./database_controllers/clearDatabase.controller");
const {
  seedWordsInDatabase
} = require("./database_controllers/seedWordsInDatabase.controller");
const curriculumDirectory = "./test/tested_Md_files/valid_files";

//Mongoose setup
const mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGO_URI || "mongodb://localhost:27017/many-words",
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;
//Get the default connection
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));
db.once("open", () => {
  console.log("Connected to database");
  seedDatabase();
});

//returns an array of word objects
async function seedDatabase() {
  let words, result;
  try {
    words = await gatherData(curriculumDirectory);
  } catch (e) {
    console.error(
      "\033[1;31m" +
        "Error while gathering data from curriculum directory" +
        "\033[0;0m"
    );
  }
  if (words) {
    console.error(
      "\033[1;32m" +
        "Data successfully retrieved from Markdown documents ☺️" +
        "\033[0;0m"
    );
  } else {
    console.error(
      "\033[1;31m" +
        "There was a problem while retrieving data from Markdown documents, check the logs. 💣" +
        "\033[0;0m"
    );
  }

  try {
    await clearDatabase();
  } catch (e) {
    console.error("\033[1;31m" + "Error while clearing database" + "\033[0;0m");
  }

  try {
    result = await seedWordsInDatabase(words);
  } catch (e) {
    console.error("\033[1;31m" + "Error while seeding database" + "\033[0;0m");
  }
  if (result) {
    console.log("\033[1;32m" + "Database successfully seeded 😎" + "\033[0;0m");
  }

  db.close(() => {
    console.log("Connection to the database closed");
  });
}
