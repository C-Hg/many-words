import lessonsByTopic from "../../exercises/data/lessonsByTopic";

// TopicsStats groups the scores of each lesson, by topic
// { topicsStats: { myTopic: { blue: 3, green: 1, gold: 1 } } }
export type TopicsStats = {
  [k in keyof typeof lessonsByTopic]: {
    blue: number;
    green: number;
    gold: number;
  };
};
