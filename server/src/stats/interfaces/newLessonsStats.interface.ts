import { Lesson } from "../../exercises/interfaces/lesson.type";
import { Topic } from "../../exercises/interfaces/topic.type";

export type NewLessonsStats = {
  lesson: Lesson;
  topic: Topic;
  scoreVariation: number;
};
