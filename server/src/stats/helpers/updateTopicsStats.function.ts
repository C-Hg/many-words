import lessonsByTopic from "../../exercises/data/lessonsByTopic";
import { Topic } from "../../exercises/models/topic.type";
import { GOLD_THRESHOLD, GREEN_THRESHOLD } from "../constants";
import { LessonsStats } from "../interfaces/lessonsStats.interface";
import { TopicsStats } from "../interfaces/topicsStats.interface";

// TODO: optimize like lessonsStats
const updateTopicsStats = (lessonsStats: LessonsStats) => {
  const updatedTopicsStats: Partial<TopicsStats> = {};

  Object.keys(lessonsByTopic).forEach((topic: Topic) => {
    const lessonsInTopic = lessonsByTopic[topic].length;
    let green = 0;
    let gold = 0;

    lessonsByTopic[topic].forEach((lesson) => {
      // has user already a score for this lesson?
      if (lessonsStats[topic] && lessonsStats[topic][lesson[0]]) {
        const lessonScore = lessonsStats[topic][lesson[0]];
        if (lessonScore >= GOLD_THRESHOLD) {
          gold += 1;
        } else if (lessonScore >= GREEN_THRESHOLD) {
          green += 1;
        }
      }
    });

    // TODO: use set +++ and tests
    // sums all lessons of the topic
    if (!updatedTopicsStats[topic]) {
      updatedTopicsStats[topic] = {
        gold,
        green,
        blue: lessonsInTopic - green - gold,
      };
    } else {
      updatedTopicsStats[topic].gold = gold;
      updatedTopicsStats[topic].green = green;
      updatedTopicsStats[topic].blue = lessonsInTopic - green - gold;
    }
  });
  return updatedTopicsStats;
};

export default updateTopicsStats;
