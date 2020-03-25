import WordStats from "../interfaces/wordStats.interface";

/**
 * Calculates the user score for one lesson, depending on the words' scores
 * @param wordsStats: the user stats for every word in this lesson
 * @param wordsByLesson: the total number of words in this lesson
 */
const assessLessonStats = (
  wordsStats: WordStats[],
  wordsByLesson: number
): number => {
  const score = wordsStats.reduce((acc, val) => {
    if (val.globalScore <= 0) {
      return acc;
    }
    if (val.globalScore >= 5) {
      return acc + 5;
    }
    return acc + val.globalScore;
  }, 0);
  return Number((score / (wordsByLesson * 5)).toFixed(3));
};

export default assessLessonStats;

/*
The lesson score is a percentage
>80% is considered golden
>40% is considered ok (green)

the percentage is calculated by summing the general proficiencies of each word
a score of 5 for all words must be achieved to reach 100%
a mean score of 4 equals to golden
a mean score of 2  equals to green

word scores below zero count for 0
word scores superior to 5 count for 5

*/
