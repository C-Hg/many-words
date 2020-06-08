const CONSTANTS = {
  allowedCharacters: /^[a-zàéèùâêîôûäëïöüç'\\-]$/i,
  lessonTypes: {
    totalNumber: "totalNumber",
    greenLessons: "greenLessons",
    goldLessons: "goldLessons",
  },
};

export enum LANGUAGES {
  English = "English",
  French = "French",
}

export default CONSTANTS;
