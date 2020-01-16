/* eslint-disable no-prototype-builtins */
import mongoose from "mongoose";
import getLessonAndTopic from "./common/getLessonAndTopic.function";
import updateFiles from "./wordCounter/updateFiles.function";
import getFilesPaths from "./common/getFilesPaths.function";
import logger from "./logger";

// TODO: add a description

const countLessonsAndTopics = async () => {
  const curriculumDirectory = "../../exercises/FR-EN";
  let wordsFilesPaths;
  const lessons = {};
  const wordCountByLesson = {};

  try {
    wordsFilesPaths = await getFilesPaths(curriculumDirectory);
  } catch (error) {
    logger.error(
      `[countLessonsAndTopics] Error while getting file paths, ${error}`
    );
    return;
  }

  /**
   * For each word, gets the lesson and topic
   */
  const allWords = wordsFilesPaths.map(path => {
    let lesson;
    let topic;
    try {
      const result = getLessonAndTopic(path);
      ({ lesson, topic } = result);
    } catch (error) {
      logger.error(error);
    }
    return { lesson, topic };
  });

  /**
   * Extracts the topics
   */
  const topics: string[] = allWords.reduce((topicsFound, word): string[] => {
    const { topic } = word;
    if (!topicsFound.includes(topic)) {
      topicsFound.push(topic);
    }
    return topicsFound;
  }, []);

  /**
   * Adds lessonsCount to each topic
   */
  const topicsWithLessonsCount = topics.map(topic => {
    const topicLessons = allWords.reduce((lessonsFound, word): string[] => {
      const { topic: currentTopic, lesson } = word;
      if (currentTopic === topic && !lessonsFound.includes(lesson)) {
        lessonsFound.push(lesson);
      }
      return lessonsFound;
    }, []);
    const lessonsCount = topicLessons.length;
    const fullTopic = {
      name: topic,
      lessonsCount,
    };
    return fullTopic;
  });

  console.info("\n---------------        topics      -----------------\n");
  console.info(topicsWithLessonsCount);

  /**
   * Adds lessons to each topic
   */
  const lessonsByTopic: { [k in string]: string[] } = {};
  topics.forEach(topic => {
    const topicLessons: string[] = allWords.reduce(
      (lessonsFound, word): string[] => {
        const { topic: currentTopic, lesson } = word;
        if (currentTopic === topic && !lessonsFound.includes(lesson)) {
          lessonsFound.push(lesson);
        }
        return lessonsFound;
      },
      []
    );
    lessonsByTopic[topic] = topicLessons;
  });

  console.info("\n---------------     lessons by topic      --------------\n");
  console.info(lessonsByTopic);

  /**
   * Gets all lessons with wordCount
   */
  const lessonsWithWordCount = allWords.reduce(
    (lessonsFound: { [k in string]: number }, word) => {
      const { lesson: currentLesson } = word;
      if (!lessonsFound.hasOwnProperty(currentLesson)) {
        // eslint-disable-next-line no-param-reassign
        lessonsFound[currentLesson] = 0;
      } else {
        // eslint-disable-next-line no-param-reassign
        lessonsFound[currentLesson] += 1;
      }
      return lessonsFound;
    },
    {}
  );

  console.info("\n----------------      lessons      ----------------\n");
  console.info(lessonsWithWordCount);

  /**
   * Global stats
   */
  const wordsCount = allWords.length;
  const lessonsCount = Object.keys(lessonsWithWordCount).length;
  const topicsCount = Object.keys(topics).length;
  const globalStats = { wordsCount, lessonsCount, topicsCount };

  console.info("\n----------------------------------------------------\n");
  logger.info(
    `${topicsCount} topics, ${lessonsCount} lessons and ${wordsCount} words`
  );
  /**
   * Complete data
   */
  // const completeExercisesData = topicsWithLessons.map(topic => {
  //   const { lessons: lessonsNames } = topic;
  //   const lessonsWithWordCount = lessonsNames.map(lessonName => {
  //     const wordsCount = allWords.reduce((wordCount, word): number => {
  //       const { lesson: currentLesson } = word;
  //       if (lessonName === currentLesson) {
  //         return wordCount + 1;
  //       }
  //       return wordCount;
  //     }, 0);
  //     return { lesson: lessonName, wordsCount };
  //   });

  //   const topicWithWordCount = {
  //     ...topic,
  //     lessons: lessonsWithWordCount,
  //   };
  //   return topicWithWordCount;
  // });

  // console.info("\n-----------   complete exercises data   -------------");
  // console.info(JSON.stringify(completeExercisesData));

  // updateFiles(lessonsByTopic, topicsWithLessonsCount, wordCountByLessonxx);
};

// Mongoose setup
mongoose.connect("mongodb://localhost:27017/many-words", {
  useNewUrlParser: true,
});
mongoose.Promise = global.Promise;
// Get the default connection
const db = mongoose.connection;
db.on("error", logger.error.bind(console, "MongoDB connection error"));
db.once("open", async () => {
  const startTime = Date.now();
  logger.info("Connected to database");
  await countLessonsAndTopics();
  const endTime = Date.now();
  logger.info(`Completion time : ${endTime - startTime} ms.`);
  db.close(() => {
    logger.info("Connection to the database closed");
  });
});
