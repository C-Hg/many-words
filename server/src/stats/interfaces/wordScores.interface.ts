export default interface WordScores {
  correctAnswers: number;
  wrongAnswers: number;
  globalScore: number;
}

export interface UpdatedWordScores {
  updatedCorrectAnswers: number;
  updatedWrongAnswers: number;
  updatedGlobalScore: number;
  greenCount: number;
  goldCount: number;
}

export interface WordsVariation {
  studiedWordsVariation: number;
  greenWordsVariation: number;
  goldWordsVariation: number;
}