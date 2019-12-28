import mongoose from "mongoose";

import clearDatabase from "./databaseSeeder/clearDatabase.function";
import seedWordsInDatabase from "./databaseSeeder/seedWordsInDatabase.function";
import secrets from "./secrets";
import gatherData from "./databaseSeeder/gatherData.function";

// the exercises directory is accessible from this directory thanks to the docker-compose configuration
const curriculumDirectory = "./exercises/FR-EN";

const seedDatabase = async (): Promise<void> => {
  let words;
  let result;
  try {
    // returns an array of word objects
    words = await gatherData(curriculumDirectory);
  } catch (error) {
    console.error(
      `\\033[1;31m` +
        "Error while gathering data from curriculum directory" +
        `\\033[0;0m\n`,
      error
    );
    return;
  }
  if (words) {
    console.info(
      `\\033[1;32m` +
        "Data successfully retrieved from Markdown documents ☺️" +
        `\\033[0;0m`
    );
  } else {
    console.error(
      `\\033[1;31m` +
        "There was a problem while retrieving data from Markdown documents, check the logs. 💣" +
        `\\033[0;0m`
    );
    return;
  }

  try {
    await clearDatabase();
  } catch (error) {
    console.error(
      `\\033[1;31m\n Error while clearing database \\033[0;0m\n`,
      error
    );
    return;
  }

  try {
    result = await seedWordsInDatabase(words);
  } catch (error) {
    console.error(
      `\\033[1;31m Error while seeding database\\033[0;0m\n`,
      error
    );
    return;
  }
  if (result) {
    console.info(`\\033[1;32m Database successfully seeded 😎\\033[0;0m`);
  }
};

// Mongoose setup

const mongooseOptions = {
  useNewUrlParser: true,
  autoReconnect: true,
  reconnectTries: 50,
  reconnectInterval: 5 * 1000,
};
mongoose.connect(secrets.MONGO_URI, mongooseOptions);
mongoose.Promise = global.Promise;
// Get the default connection
const db = mongoose.connection;
db.on("error", () => {
  console.error("MongoDB connection error, retrying to connect in 20s.");
  setTimeout(() => {
    mongoose.connect(secrets.MONGO_URI, mongooseOptions);
  }, 20000);
});
db.once("open", async () => {
  const startTime = Date.now();
  console.info("Connected to database");
  await seedDatabase();
  const endTime = Date.now();
  console.info(
    `\\033[1;32m` +
      `Completion time : ${endTime - startTime} ms.` +
      `\\033[0;0m`
  );

  db.close(() => {
    console.info("Connection to the database closed");
    process.exit();
  });
});
