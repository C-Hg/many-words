const getLessonsToUpdate = wordsStats => {
  const lessons = [];
  wordsStats.forEach(wordStats => {
    if (!lessons.includes(wordStats.lesson)) {
      lessons.push(wordStats.lesson);
    }
  });
  return lessons;
};

export default getLessonsToUpdate;
