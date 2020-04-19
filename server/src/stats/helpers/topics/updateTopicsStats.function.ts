import lessonsByTopic from "../../../exercises/data/lessonsByTopic";
import { isLesson } from "../../../exercises/interfaces/lesson.type";
import { isTopic } from "../../../exercises/interfaces/topic.type";
import { TopicStats, LessonsScores } from "../../../graphql/types";
import { LESSON_GOLD_THRESHOLD, LESSON_GREEN_THRESHOLD } from "../../constants";

/**
 * Produces an updated topicsStats object from the lessons' stats
 */
const updateTopicsStats = (lessonsScores: LessonsScores): TopicStats[] => {
  const updatedTopicsStats: TopicStats[] = [];

  // for each topic
  Object.keys(lessonsByTopic).map((topic) => {
    if (!isTopic(topic)) {
      throw new Error(`[updateTopicsStats] unknown topic ${topic}`);
    }
    let green = 0;
    let gold = 0;
    let shouldCreateEntry = false;

    // check if the user has scores for the lessons inside this topic
    lessonsByTopic[topic].forEach((lesson) => {
      if (!isLesson(lesson)) {
        throw new Error(`[updateTopicsStats] unknown lesson ${lesson}`);
      }
      const lessonScore = lessonsScores?.[lesson];
      if (!lessonScore) {
        // the user has no score for this lesson
        return;
      }
      shouldCreateEntry = true;

      if (lessonScore >= LESSON_GOLD_THRESHOLD) {
        gold += 1;
      } else if (lessonScore >= LESSON_GREEN_THRESHOLD) {
        green += 1;
      }
    });

    // at least one lesson has a positive score
    // create an entry for this topic in the stats array
    if (shouldCreateEntry) {
      updatedTopicsStats.push({
        id: topic,
        lessonsGrades: {
          green,
          gold,
        },
      });
    }
  });

  return updatedTopicsStats;
};

export default updateTopicsStats;
