import React from "react";

export const languages = {
  English: {
    animals_lesson: "Animals",
    learn: "learn",
    check_button: "Check",
    next_button: "Next",
    translate_in: "Translate this word in",
    french: "French",
    english: "English",
    correct: "Correct answer",
    wrong: "Wrong answer",
    masculine: "masculine",
    feminine: "feminine",
    singular: "singular",
    plural: "plural",
    definite: "definite",
    indefinite: "indefinite"
  },
  French: {
    animals_lesson: "Animaux",
    learn: "apprendre",
    check_button: "Vérifier",
    next_button: "Suivant",
    translate_in: "Traduis ce mot en ",
    french: "français",
    english: "anglais",
    correct: "Bonne réponse",
    wrong: "Mauvaise réponse",
    masculine: "masculin",
    feminine: "féminin",
    singular: "singulier",
    plural: "pluriel",
    definite: "défini",
    indefinite: "indéfini"
  }
};

export const LanguageContext = React.createContext(
  languages.English // default value
);
