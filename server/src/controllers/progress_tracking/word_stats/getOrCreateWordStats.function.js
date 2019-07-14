import getWordStats from "../getWordStats.controller";

const getOrCreateWordStats = async (exerciseResults, userId) => {
  const allWordStats = exerciseResults.map(async wordResult => {
    const wordStats = await getWordStats(wordResult[0], userId);
    return wordStats;
  });

  const fetchedWordStats = await Promise.all(allWordStats);
  return fetchedWordStats;
};

export default getOrCreateWordStats;
