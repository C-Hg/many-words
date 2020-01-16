/* eslint-disable no-prototype-builtins */
import getLessonAndTopic from "./common/getLessonAndTopic.function";
import updateFiles from "./wordCounter/updateFiles.function";
import getFilesPaths from "./common/getFilesPaths.function";
import logger from "./logger";

const countLessonsAndTopics = async (): Promise<void> => {
  const curriculumDirectory = "../../exercises/FR-EN";
  let wordsFilesPaths;

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
  const wordCountByLesson = allWords.reduce(
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
  console.info(wordCountByLesson);

  /**
   * Global stats
   */
  const wordsCount = allWords.length;
  const lessonsCount = Object.keys(wordCountByLesson).length;
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

  await updateFiles(
    lessonsByTopic,
    topicsWithLessonsCount,
    wordCountByLesson,
    globalStats
  );
};

const wordCounter = async (): Promise<void> => {
  const startTime = Date.now();
  await countLessonsAndTopics();
  const endTime = Date.now();
  logger.info(`Completion time : ${endTime - startTime} ms.`);
};

wordCounter();
