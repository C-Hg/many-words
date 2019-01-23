import React from "react";

export const languages = {
  English: {
    language: "english",
    navigation: {
      login_with: "Log in with",
      logout: "Log out"
    },
    home: {
      main_title: "Enhance your French vocabulary",
      word_stats_ok: "Total words studied : ",
      word_stats_no: "It's time to start learning !",
      logout_success: "You were successfully disconnected",
      logout_failure: "There was a problem during the disconnection"
    },
    curriculum: {
      title: "What do you want to learn?"
    },
    themes: {
      nature: "Nature",
      education: "Education",
      relationships: "Relationships",
      leisure: "Leisure Activities",
      health: "Health"
    },
    subthemes: {
      numbers: "Numbers",
      school: "School",
      animals: "Animals",
      earth: "Earth",
      landscapes: "Landscapes",
      food: "Food",
      healthcare: "Medecine",
      human_body: "Human body"
    },
    lessons: {
      first_numbers: "First numbers",
      more_numbers: "More numbers",
      large_numbers: "Large numbers",
      food_basics: "Basics",
      drinks: "Drinks",
      fruits: "Fruits",
      vegetables: "Vegetables",
      animals_basics: "Common animals",
      mammals: "Mammals",
      birds: "Birds"
    },
    start_exercise: "test",
    start_learning: "learn",
    check_button: "Check",
    next_button: "Next",
    translate_in: "Translate this word in",
    french: "French",
    english: "English",
    correct: [
      "Excellent",
      "You're right",
      "Perfect",
      "Nothing to say",
      "Impressive",
      "Target hit",
      "Great",
      "Good",
      "Indeed",
      "Easy",
      "Well done",
      "Nice",
      "Way to go",
      "Wonderful",
      "Incredible",
      "Bravo",
      "Et voilà"
    ],
    no_mistake: "Congratulations, you've made no mistake !",
    one_mistake: "Great, it is almost perfect !",
    one_mistake_instructions: "Mind this word :",
    more_mistakes: "Take a moment to memorize the words you missed :",
    try_again: "Try again",
    to_continue: "Continue",
    masculine: "masculine",
    feminine: "feminine",
    singular: "singular",
    plural: "plural",
    definite: "definite",
    indefinite: "indefinite"
  },
  French: {
    language: "french",
    navigation: {
      login_with: "Connexion avec",
      logout: "Déconnexion"
    },
    home: {
      main_title: "Enrichis ton vocabulaire anglais",
      word_stats_ok: "Nombre de mots étudiés : ",
      word_stats_no: "C'est l'heure d'apprendre !",
      logout_success: "Vous êtes maintenant déconnecté",
      logout_failure: "Il y a eu un problème pendant la déconnexion"
    },
    curriculum: {
      title: "Que veux-tu apprendre?"
    },
    themes: {
      nature: "Nature",
      education: "Éducation",
      relationships: "Relations",
      leisure: "Loisirs",
      health: "Santé"
    },
    subthemes: {
      numbers: "Les nombres",
      school: "L'école",
      animals: "Les animaux",
      earth: "La Terre",
      landscapes: "Les paysages",
      food: "La nourriture",
      healthcare: "La médecine",
      human_body: "Le corps humain"
    },
    lessons: {
      first_numbers: "Premiers nombres",
      more_numbers: "Plus de nombres",
      large_numbers: "Grands nombres",
      food_basics: "Bases",
      drinks: "Boissons",
      fruits: "Fruits",
      vegetables: "Légumes",
      common_animals: "Animaux courants",
      mammals: "Mammifères",
      birds: "Oiseaux"
    },
    start_exercise: "test",
    start_learning: "apprendre",
    check_button: "Vérifier",
    next_button: "Suivant",
    translate_in: "Traduis ce mot en ",
    french: "français",
    english: "anglais",
    correct: [
      "Excellent",
      "C'est exact",
      "Parfait",
      "Rien à dire",
      "Impressionnant",
      "Dans la cible",
      "Bien",
      "Très bien",
      "Tout à fait",
      "Facile",
      "Bien joué",
      "Joli",
      "Exactement",
      "Merveilleux",
      "Formidable",
      "Bravo",
      "Et voilà"
    ],
    no_mistake: "Félicitations, tu n'as fait aucune erreur !",
    one_mistake: "Bravo, c'est presque parfait !",
    one_mistake_instructions: "Fais attention à ce mot :",
    more_mistakes: "Prends un moment pour apprendre ces mots :",
    try_again: "Réessayer",
    to_continue: "Continuer",
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
