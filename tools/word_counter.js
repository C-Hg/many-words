const countWords = require("./word_counter/countWords.function");
const fileExplorer = require("./common/fs_explorers/getFiles.function");
const getLessonAndTheme = require("./common/getLessonAndTheme.function");

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
db.once("open", async () => {
  let startTime = new Date();
  console.log("Connected to database");
  await countLessonsAndThemes();
  let endTime = new Date();
  console.log(
    "\033[1;32m" + `Completion time : ${endTime - startTime} ms.` + "\033[0;0m"
  );
  db.close(() => {
    console.log("Connection to the database closed");
  });
});

async function countLessonsAndThemes() {
  const curriculumDirectory = "../exercises/FR-EN";
  let wordFilesPaths;
  let lessons = {};
  let themes = [];
  let wordCountByLesson = {};

  try {
    wordFilesPaths = await fileExplorer.getFilesPaths(curriculumDirectory);
  } catch (e) {
    console.error(
      "\033[1;31m" + "Error while getting file paths" + "\033[0;0m"
    );
    return;
  }

  for (const path of wordFilesPaths) {
    let lessonAndTheme = getLessonAndTheme(path);
    if (!lessonAndTheme[0] || !lessonAndTheme[1]) {
      console.log(
        "\033[1;31m" + "Error while getting lesson or theme name" + "\033[0;0m"
      );
      return;
    }

    /*   ----- gathers lessons and themes with their word counts    ------ */
    //lessons first
    if (!lessons.hasOwnProperty(lessonAndTheme[1])) {
      lessons[lessonAndTheme[1]] = [];
    } else {
      let lessonFound = false;
      for (let lesson of lessons[lessonAndTheme[1]]) {
        if (lesson.includes(lessonAndTheme[0])) {
          lessonFound = true;
        }
      }
      if (!lessonFound) {
        let wordCount = await countWords(lessonAndTheme[0]);
        lessons[lessonAndTheme[1]].push([lessonAndTheme[0], wordCount]);
      }
    }
  }
  // TO DO : not automatically updating the file in server package : copy-paste for now
  console.log(lessons);

  //then reducing to themes, outside of the getLessonAndTheme for loop
  for (let theme in lessons) {
    let totalCount = lessons[theme].reduce((acc, val) => {
      return acc + val[1];
    }, 0);
    themes.push([theme, totalCount, lessons[theme].length]);
  }

  console.log("-----------   themes   -------------");
  console.log(themes);

  //counting words for each lesson, inside a single object
  for (let theme in lessons) {
    for (let lesson of lessons[theme]) {
      wordCountByLesson[lesson[0]] = lesson[1];
    }
  }

  console.log("-----------   word counts  -------------");
  console.log(wordCountByLesson);
}
