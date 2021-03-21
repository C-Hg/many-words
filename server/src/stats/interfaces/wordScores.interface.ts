export default interface WordScores {
  correctAnswers: number;
  wrongAnswers: number;
  score: number;
}

export interface UpdatedWordScores {
  updatedCorrectAnswers: number;
  updatedWrongAnswers: number;
  updatedScore: number;
  greenCount: number;
  goldCount: number;
}

export interface WordsVariation {
  studiedWordsVariation: number;
  greenWordsVariation: number;
  goldWordsVariation: number;
}
