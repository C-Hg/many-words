import set from "lodash.set";

import lessonsByTopic from "../../../exercises/data/lessonsByTopic";
import { isLesson } from "../../../exercises/interfaces/lesson.type";
import { isTopic } from "../../../exercises/interfaces/topic.type";
import { LessonsStats } from "../../../graphql/types";
import { LESSON_GOLD_THRESHOLD, LESSON_GREEN_THRESHOLD } from "../../constants";
import { TopicsStats } from "../../interfaces/topicsStats.interface";

/**
 * Produces an updated topicsStats object from the lessons' stats
 */
const updateTopicsStats = (
  lessonsStats: Partial<LessonsStats>
): Partial<TopicsStats> => {
  const updatedTopicsStats: Partial<TopicsStats> = {};

  // for each known topic
  Object.keys(lessonsByTopic).map((topic) => {
    if (!isTopic(topic)) {
      throw new Error(`[updateTopicsStats] unknown topic ${topic}`);
    }
    const lessonsInTopic = lessonsByTopic[topic].length;
    let green = 0;
    let gold = 0;

    // check if the user has scores for the lesson inside this topic
    lessonsByTopic[topic].forEach((lesson) => {
      if (!isLesson(lesson)) {
        throw new Error(`[updateTopicsStats] unknown lesson ${lesson}`);
      }
      const lessonScore = lessonsStats?.[topic]?.[lesson];
      if (!lessonScore) {
        // the user has no score for this lesson
        return;
      }
      if (lessonScore >= LESSON_GOLD_THRESHOLD) {
        gold += 1;
      } else if (lessonScore >= LESSON_GREEN_THRESHOLD) {
        green += 1;
      }
    });

    // update the stats for this topic
    set(updatedTopicsStats, [topic, "blue"], lessonsInTopic - green - gold);
    set(updatedTopicsStats, [topic, "green"], green);
    set(updatedTopicsStats, [topic, "gold"], gold);
  });

  return updatedTopicsStats;
};

export default updateTopicsStats;
