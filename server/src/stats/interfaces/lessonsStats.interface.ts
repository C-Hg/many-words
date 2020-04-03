import lessonsByTopic from "../../exercises/data/lessonsByTopic";
import { Lesson } from "../../exercises/models/lesson.type";
import { Topic } from "../../exercises/models/topic.type";

// myLesson: 5
type LessonScore = {
  [k in Lesson]: number;
};

// LessonsStats groups the score of each lesson, by topic
// { lessonStats: { myTopic: { myLesson: 3 } } }
export type LessonsStats = {
  [k in keyof typeof lessonsByTopic]: Partial<LessonScore>;
};

export type NewLessonsStats = {
  lesson: Lesson;
  topic: Topic;
  scoreVariation: number;
};
