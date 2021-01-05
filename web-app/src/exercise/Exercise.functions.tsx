/** Local updates are done with these functions */

import {
  isAnswerCorrectVar,
  isCheckingAnswerVar,
  userTranslationVar,
  wordRankVar,
} from "../cache";

export const continueWithNextWord = () => {
  const wordRank = wordRankVar();

  isAnswerCorrectVar(false);
  isCheckingAnswerVar(false);
  userTranslationVar("");
  wordRankVar(wordRank + 1);
};
