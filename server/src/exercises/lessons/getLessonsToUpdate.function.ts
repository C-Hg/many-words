import { Lesson } from "./models/lesson.type";
import WordStats from "../words/interfaces/wordStats.interface";

const getLessonsToUpdate = (wordsStats: WordStats[]): Lesson[] => {
  const lessons: Lesson[] = [];
  wordsStats.forEach(wordStats => {
    if (!lessons.includes(wordStats.lesson)) {
      lessons.push(wordStats.lesson);
    }
  });
  return lessons;
};

export default getLessonsToUpdate;
