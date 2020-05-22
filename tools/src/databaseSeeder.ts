import mongoose from "mongoose";

import logger from "./logger";
import clearDatabase from "./databaseSeeder/clearDatabase.function";
import seedWordsInDatabase from "./databaseSeeder/seedWordsInDatabase.function";
import secrets from "./secrets";
import gatherData from "./databaseSeeder/gatherData.function";

// the exercises directory is accessible from this directory thanks to the docker-compose configuration
const curriculumDirectory = "/exercises/FR-EN";

const seedDatabase = async (): Promise<void> => {
  let words;
  let result;
  try {
    // returns an array of word objects
    words = await gatherData(curriculumDirectory);
  } catch (error) {
    logger.error(
      "Error while gathering data from curriculum directory\n",
      error
    );
    return;
  }
  if (words) {
    logger.info("Data successfully retrieved from Markdown documents ☺️");
  } else {
    logger.error(
      "There was a problem while retrieving data from Markdown documents, check the logs. 💣"
    );
    return;
  }

  try {
    await clearDatabase();
  } catch (error) {
    logger.error(`\n Error while clearing database \n`, error);
    return;
  }

  try {
    result = await seedWordsInDatabase(words);
  } catch (error) {
    logger.error(`Error while seeding database\n`, error);
    return;
  }
  if (result) {
    logger.info(`Database successfully seeded 😎`);
  }
};

// Mongoose setup

const mongooseOptions = {
  useNewUrlParser: true,
  autoReconnect: true,
  reconnectTries: 50,
  reconnectInterval: 5 * 1000,
};
mongoose.connect(secrets.mongoUri, mongooseOptions);
mongoose.Promise = global.Promise;
// Get the default connection
const db = mongoose.connection;
db.on("error", () => {
  logger.error("MongoDB connection error, retrying to connect in 20s.");
  setTimeout(() => {
    mongoose.connect(secrets.mongoUri, mongooseOptions);
  }, 20000);
});
db.once("open", async () => {
  const startTime = Date.now();
  logger.info("Connected to database");
  await seedDatabase();
  const endTime = Date.now();
  logger.info(`Completion time : ${endTime - startTime} ms.`);

  db.close(() => {
    logger.info("Connection to the database closed");
    process.exit();
  });
});
