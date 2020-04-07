export default interface GlobalStats {
  studiedLessons: number;
  greenLessons: number;
  goldLessons: number;
  studiedWords: number;
  greenWords: number;
  goldWords: number;
  globalProgress: number;
}

export interface UpdatedGlobalLessonsStats {
  updatedStudiedLessons: number;
  updatedGreenLessons: number;
  updatedGoldLessons: number;
}
