import wordCountByLesson from "../data/wordCountByLesson";

export type Lesson = keyof typeof wordCountByLesson;

// type guard
export const isLesson = (lesson: string): lesson is Lesson => {
  return Object.keys(wordCountByLesson).includes(lesson);
};
