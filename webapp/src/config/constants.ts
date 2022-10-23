const CONSTANTS = {
  allowedCharacters: /^[a-zàéèùâêîôûäëïöüç'\\-]$/i,
  lessonTypes: {
    totalNumber: "totalNumber",
    greenLessons: "greenLessons",
    goldLessons: "goldLessons",
  },
};

export enum LANGUAGES {
  English = "english",
  French = "french",
}

export default CONSTANTS;
