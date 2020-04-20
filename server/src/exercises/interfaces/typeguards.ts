import { Topic, Lesson } from "../../graphql/types";
import lessonsByTopic from "../data/lessonsByTopic";
import wordCountByLesson from "../data/wordCountByLesson";

export const isTopic = (topic: string): topic is Topic => {
  return Object.keys(lessonsByTopic).includes(topic);
};

export const isLesson = (lesson: string): lesson is Lesson => {
  return Object.keys(wordCountByLesson).includes(lesson);
};
