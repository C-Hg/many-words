import { Lesson } from "./models/lessons.type";
import WordStats from "../words/models/words/wordStats.interface";

// TODO: strong typing with lessons
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
