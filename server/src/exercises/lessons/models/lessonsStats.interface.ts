import lessonsByTopic from "../../data/lessonsByTopic";
import { Lesson } from "./lesson.type";

// myLesson: 5
type LessonScore = {
  [k in Lesson]: number;
};

// LessonsStats groups the score of each lesson, by topic
// { lessonstats: { myTopic: { myLesson: 3 } } }
export type LessonsStats = {
  [k in keyof typeof lessonsByTopic]: Partial<LessonScore>;
};
