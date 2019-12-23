import {
  gatherData
} from "./database_seeder/markdown_fetching_functions/gatherData.function";
import {
  clearDatabase
} from "./database_seeder/database_controllers/clearDatabase.controller";
import {
  seedWordsInDatabase
} from "./database_seeder/database_controllers/seedWordsInDatabase.controller";
// the exercises directory is accessible from this directory thanks to the docker-compose configuration
import curriculumDirectory from "./exercises/FR-EN";
import secrets from "./secrets"

//Mongoose setup
const mongoose = require("mongoose");
mongooseOptions = {
  useNewUrlParser: true,
  autoReconnect: true,
  reconnectTries: 50,
  reconnectInterval: 5 * 1000
}
mongoose.connect(secrets.MONGO_URI, mongooseOptions);
mongoose.Promise = global.Promise;
//Get the default connection
let db = mongoose.connection;
db.on("error", () => {
  console.error("MongoDB connection error, retrying to connect in 20s.")
  setTimeout(() => { mongoose.connect(secrets.MONGO_URI, mongooseOptions);}, 20000)
} );
db.once("open", async () => {
  let startTime = new Date();
  console.log("Connected to database");
  await seedDatabase();
  let endTime = new Date();
  console.log(
    "\033[1;32m" + `Completion time : ${endTime - startTime} ms.` + "\033[0;0m"
  )

  db.close(() => {
    console.log("Connection to the database closed");
    process.exit()
  });
});

const seedDatabase = async () =>{
  let words, result;
  try {
    //returns an array of word objects
    words = await gatherData(curriculumDirectory);
  } catch (error) {
    console.error(
      "\033[1;31m" +
      "Error while gathering data from curriculum directory" +
      "\033[0;0m\n", error
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
  } catch (error) {
    console.error("\033[1;31m" + "Error while clearing database" + "\033[0;0m\n", error);
    return;
  }

  try {
    result = await seedWordsInDatabase(words);
  } catch (error) {
    console.error("\033[1;31m" + "Error while seeding database" + "\033[0;0m\n", error);
    return;
  }
  if (result) {
    console.log("\033[1;32m" + "Database successfully seeded 😎" + "\033[0;0m");
  }
}
