import React from "react";

export const languages = {
  English: {
    themes: {
      nature: "Nature"
    },
    subthemes: {
      animals: "Animals",
      earth: "Earth",
      landscapes: "Landscapes"
    },
    lessons: {
      common_animals: "Common animals",
      mammals: "Mammals",
      birds: "Birds"
    },
    curriculum_title: "What do you want to learn?",
    start_exercise: "test",
    start_learning: "learn",
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
    themes: {
      nature: "Nature"
    },
    subthemes: {
      animals: "Animaux",
      earth: "La Terre",
      landscapes: "Paysages"
    },
    lessons: {
      common_animals: "Animaux courants",
      mammals: "Mammifères",
      birds: "Oiseaux"
    },
    curriculum_title: "Que veux-tu apprendre?",
    start_exercise: "test",
    start_learning: "apprendre",
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
