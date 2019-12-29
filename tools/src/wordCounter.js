import mongoose from "mongoose";
import countWords from "./wordCounter/countWords.function";
import getLessonAndTopic from "./common/getLessonAndTopic.function";
import updateFiles from "./wordCounter/updateFiles.function";
import secrets from "./secrets";
import getFilesPaths from "./common/fs_explorers/getFiles.function";

// Mongoose setup
mongoose.connect(secrets.MONGO_URI || "mongodb://mongo:27017/many-words", {
  useNewUrlParser: true,
});
mongoose.Promise = global.Promise;
// Get the default connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));
db.once("open", async () => {
  const startTime = new Date();
  console.info("Connected to database");
  await countLessonsAndThemes();
  const endTime = new Date();
  console.info(
    `\\033[1;32mCompletion time : ${endTime - startTime} ms.\\033[0;0m`
  );
  db.close(() => {
    console.info("Connection to the database closed");
  });
});

const countLessonsAndThemes = async () => {
  const curriculumDirectory = "../exercises/FR-EN";
  let wordFilesPaths;
  const lessons = {};
  const themes = [];
  const wordCountByLesson = {};

  try {
    wordFilesPaths = await getFilesPaths(curriculumDirectory);
  } catch (e) {
    console.error(`\\033[1;31mError while getting file paths\\033[0;0m`);
    return;
  }

  for (const path of wordFilesPaths) {
    const lessonAndTheme = getLessonAndTopic(path);
    if (!lessonAndTheme[0] || !lessonAndTheme[1]) {
      console.info(
        `\\033[1;31mError while getting lesson or theme name\\033[0;0m`
      );
      return;
    }

    /*   ----- gathers lessons and themes with their word counts    ------ */
    // lessons first
    if (!lessons.hasOwnProperty(lessonAndTheme[1])) {
      lessons[lessonAndTheme[1]] = [];
    } else {
      let lessonFound = false;
      for (const lesson of lessons[lessonAndTheme[1]]) {
        if (lesson.includes(lessonAndTheme[0])) {
          lessonFound = true;
        }
      }
      if (!lessonFound) {
        const wordCount = await countWords(lessonAndTheme[0]);
        lessons[lessonAndTheme[1]].push([lessonAndTheme[0], wordCount]);
      }
    }
  }
  // TO DO : not automatically updating the file in server package : copy-paste for now
  console.info(lessons);

  // then reducing to themes, outside of the getLessonAndTopic for loop
  for (const theme in lessons) {
    const totalCount = lessons[theme].reduce((acc, val) => {
      return acc + val[1];
    }, 0);
    themes.push([theme, totalCount, lessons[theme].length]);
  }

  console.info("-----------   themes   -------------");
  console.info(themes);

  // counting words for each lesson, inside a single object
  for (const theme in lessons) {
    for (const lesson of lessons[theme]) {
      wordCountByLesson[lesson[0]] = lesson[1];
    }
  }

  console.info("-----------   word counts  -------------");
  console.info(wordCountByLesson);

  updateFiles(lessons, themes, wordCountByLesson);
};
