import frenchEnglishLessons from "../../exercises/data/lessonsByTopic";

type Topic = keyof typeof frenchEnglishLessons;
// TODO: convert lessonsByTopics to objects
const getUpdatedTopicsStats = (updatedLessonsStats) => {
  const updatedTopicsStats = {};

  Object.keys(frenchEnglishLessons).forEach((topic: Topic) => {
    let green = 0;
    let gold = 0;

    frenchEnglishLessons[topic].forEach((lesson) => {
      // has user already a score for this lesson?
      if (updatedLessonsStats[topic] && updatedLessonsStats[topic][lesson[0]]) {
        const lessonScore = updatedLessonsStats[topic][lesson[0]];
        if (lessonScore >= 0.8) {
          gold += 1;
        } else if (lessonScore >= 0.4) {
          green += 1;
        }
      }
    });

    // sums all lessons of the topic
    if (!updatedTopicsStats[topic]) {
      updatedTopicsStats[topic] = {};
    }
    updatedTopicsStats[topic].gold = gold;
    updatedTopicsStats[topic].green = green;
  });
  return updatedTopicsStats;
};

export default getUpdatedTopicsStats;
