import React from "react";

export const languages = {
  English: {
    animals_lesson: "Animals",
    check_button: "Check",
    next_button: "Next",
    translate_in: "Translate this word in",
    french: "French",
    english: "English",
    correct: "Correct answer",
    wrong: "Wrong answer"
  },
  French: {
    animals_lesson: "Animaux",
    check_button: "Vérifier",
    next_button: "Suivant",
    translate_in: "Traduis ce mot en ",
    french: "français",
    english: "anglais",
    correct: "Bonne réponse",
    wrong: "Mauvaise réponse"
  }
};

export const LanguageContext = React.createContext(
  languages.English // default value
);
