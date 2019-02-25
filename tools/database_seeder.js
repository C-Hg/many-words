require("dotenv").config({ path: process.cwd() + "/.env" });
const {
  gatherData
} = require("./database_seeder/markdown_fetching_functions/gatherData.function");
const {
  clearDatabase
} = require("./database_seeder/database_controllers/clearDatabase.controller");
const {
  seedWordsInDatabase
} = require("./database_seeder/database_controllers/seedWordsInDatabase.controller");
const curriculumDirectory = "../exercises/FR-EN";

//Mongoose setup
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/many-words" || process.env.MONGO_URI, {
  useNewUrlParser: true
});
mongoose.Promise = global.Promise;
//Get the default connection
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));
db.once("open", async () => {
  let startTime = new Date();
  console.log("Connected to database");
  await seedDatabase();
  let endTime = new Date();
  console.log(
    "\033[1;32m" + `Completion time : ${endTime - startTime} ms.` + "\033[0;0m"
  );

  db.close(() => {
    console.log("Connection to the database closed");
  });
});

async function seedDatabase() {
  let words, result;
  try {
    //returns an array of word objects
    words = await gatherData(curriculumDirectory);
  } catch (e) {
    console.error(
      "\033[1;31m" +
        "Error while gathering data from curriculum directory" +
        "\033[0;0m"
    );
    return;
  }
  if (words) {
    console.log(
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
    return;
  }

  try {
    await clearDatabase();
  } catch (e) {
    console.error("\033[1;31m" + "Error while clearing database" + "\033[0;0m");
    return;
  }

  try {
    result = await seedWordsInDatabase(words);
  } catch (e) {
    console.error("\033[1;31m" + "Error while seeding database" + "\033[0;0m");
    return;
  }
  if (result) {
    console.log("\033[1;32m" + "Database successfully seeded 😎" + "\033[0;0m");
  }
}
