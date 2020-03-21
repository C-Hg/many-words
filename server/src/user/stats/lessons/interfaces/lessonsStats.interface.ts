import lessonsByTopic from "../../data/lessonsByTopic";
import { Lesson } from "../models/lesson.type";

// myLesson: 5
type LessonScore = {
  [k in Lesson]: number;
};

// LessonsStats groups the score of each lesson, by topic
// { lessonStats: { myTopic: { myLesson: 3 } } }
export type LessonsStats = {
  [k in keyof typeof lessonsByTopic]: Partial<LessonScore>;
};
