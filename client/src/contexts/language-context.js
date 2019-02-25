import React from "react";

export const languages = {
  English: {
    language: "english",
    navbar: {
      home: "Home",
      login: "Log in"
    },
    navigation: {
      login_with: "Log in with",
      logout: "Log out"
    },
    about: {
      title: "About Many Words",
      description: `  As you may have noticed, Many Words is in the early stages of its development.
      This WebApp is not for profit : you will see no ads and your privacy will be respected (no tracker or third-party cookies).
      If you have questions, suggestions, or have noticed a bug or a mistake, please contact me via Twitter or Github.
      The codebase is open-source under the MIT license, any help is welcome!`,
      roadmap: "Roadmap",
      roadmap_short: "Short term",
      roadmap_long: "Long term",
      sht_1: "More content: from 2000 to 3000 words (scaling is easy now)",
      sht_2: "Weak words: focus on the weak words of a given lesson or theme",
      sht_3: "Lesson levels: 3 differents levels of difficulty",
      sht_4: "Progressive learning: unlock lessons progressively",
      sht_5:
        "Continuous learning: learn without leaving the exercise screen, the app selects your weak words and next lesson.",
      sht_6: "We're out of beta!",
      lgt_1: "Add a third language: Spanish most probably",
      lgt_2: "Learn the vocabulary of 2 or 3 languages at the same time",
      lgt_3: "Publish a smartphone app if people are interested",
      lgt_4: "Climb to 5 languages"
    },
    home: {
      main_title: "Improve your French vocabulary",
      features_free: "100% Free",
      features_words: "750+ Words",
      features_progress: "Earn stars",
      register: "Log in to track your progress",
      discover: "Or start learning without registering",
      discover_button: "Let's go !",
      progress_title: "Global completion",
      no_stats: "It's time to start learning !",
      words: "Words",
      lessons: "Lessons",
      resume_learning: "Resume learning",
      about: "About",
      delete_account: "Delete my account",
      confirm_deletion:
        "All your data will be permanently deleted. Are you sure?",
      confirm: "Confirm",
      back: "Cancel",
      delete_success: "You account has been permanently deleted",
      delete_waiting: "Deletion in progress",
      logout_success: "You were successfully disconnected",
      logout_progress: "Logging out"
    },
    curriculum: {
      title: "What do you want to learn?"
    },
    themes: {
      animals: "Animals",
      clothes: "Clothes",
      colors: "Colors",
      food: "Food",
      habitation: "Habitation",
      human_body: "Human body",
      nature: "Nature",
      numbers: "Numbers",
      social_life: "Social life",
      society: "Society",
      time: "Time",
      vegetals: "Vegetals"
    },
    lessons: {
      animals: {
        animals_basics: "Animals, basics",
        birds: "Birds",
        farm_animals: "Farm animals",
        insects: "Insects",
        mammals_1: "Mammals",
        sea_animals: "Sea animals"
      },
      clothes: {
        accessories: "Accessories",
        clothes_basics: "Clothes 1",
        more_clothes: "Clothes 2"
      },
      colors: {
        main_colors: "Main colors"
      },
      food: {
        agriculture: "Agriculture",
        drinks: "Drinks",
        food_basics: "Food 1",
        foods: "Foods",
        fruits: "Fruits",
        more_fruits_and_vegetables: "Fruits and Vegetables 2",
        vegetables: "Vegetables"
      },
      habitation: {
        construction_materials: "Materials",
        construction_tools: "Tools",
        furniture: "Furniture",
        house: "House",
        housing: "Housing",
        rooms: "Rooms"
      },
      human_body: {
        human_body_basics: "Human body",
        head: "Head",
        limbs: "Limbs",
        organs: "Organs",
        senses: "Senses"
      },
      nature: {
        earth: "Earth",
        nature_basics: "Nature",
        sea: "Sea",
        universe: "Universe",
        weather_1: "Weather 1",
        weather_2: "Weather 2"
      },
      numbers: {
        first_numbers: "First numbers",
        more_numbers: "More numbers",
        large_numbers: "Large numbers"
      },
      social_life: {
        close_family: "Close family",
        human_beings: "Human beings",
        identity: "Identity",
        introduction: "Introduction"
      },
      society: {
        buildings: "Buildings",
        town: "Town",
        transports: "Transports"
      },
      time: {
        days: "Days",
        months: "Months",
        time_basics: "Time 1",
        time_description_1: "Time 2",
        time_description_2: "Time 3",
        time_divisions: "Time divisions"
      },
      vegetals: {
        plants: "Plants",
        trees: "Trees",
        vegetals_basics: "Vegetals"
      }
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

  /* --------------------        FRENCH     ------------------- */

  French: {
    language: "french",
    navbar: {
      home: "Accueil",
      login: "Connexion"
    },
    navigation: {
      login_with: "Connexion avec",
      logout: "Déconnexion"
    },
    about: {
      title: "À propos de Many Words",
      description: `Comme tu as pu le remarquer, Many Words est 
      encore à la phase précoce de son développement. Cette application 
      n'est pas à but lucratif : tu ne trouveras aucune publicité et 
      ta vie privée sera respectée (pas de traqueurs ni de cookies tiers). Si tu as des questions, remarques,
       ou si tu souhaites signaler des bugs, contacte-moi via Twitter ou Github. 
       Le code est open-source sous licence MIT, toute aide est la bienvenue!`,
      roadmap: "Fonctionnalités futures",
      roadmap_short: "Court terme",
      roadmap_long: "Long terme",
      sht_1:
        "Plus de contenu: entre 2000 et 3000 mots (facile à augmenter maintenant)",
      sht_2:
        "Mots faibles: concentre-toi sur tes points faibles par leçon ou par thème",
      sht_3: "Niveaux de leçons: 3 niveaux de difficulté",
      sht_4: "Apprentissage progressif: débloque les leçons au fur et à mesure",
      sht_5:
        "Apprentissage continu: apprends sans revenir au menu, l'application sélectionne tes points faibles et les prochaines leçons",
      sht_6: "Fin de la beta!",
      lgt_1: "Ajout d'une troisième langue: l'Espagnol très probablement",
      lgt_2: "Apprends le vocabulaire de 2 ou 3 langues simultanément",
      lgt_3:
        "Publication d'une application pour smartphone si la demande est présente",
      lgt_4: "Ajouter jusqu'à 5 languages"
    },
    home: {
      main_title: "Enrichis ton vocabulaire anglais",
      features_free: "100% Gratuit",
      features_words: "750+ Mots",
      features_progress: "Suis tes progrès",
      register: "Connecte-toi pour enregister ta progression",
      discover: "Ou commence ton apprentissage sans te connecter",
      discover_button: "C'est parti !",
      progress_title: "Avancement global",
      no_stats: "C'est l'heure d'apprendre !",
      words: "Mots",
      lessons: "Leçons",
      resume_learning: "Apprendre",
      about: "À propos",
      delete_account: "Supprimer mon compte",
      confirm_deletion:
        "Toutes tes données seront supprimées définitivement. Es-tu sûr?",
      confirm: "Confirmer",
      back: "Annuler",
      delete_success: "Ton compte a été définitivement supprimé",
      delete_waiting: "Suppression en cours",
      logout_success: "Tu es maintenant déconnecté",
      logout_progress: "Déconnexion en cours"
    },
    curriculum: {
      title: "Que veux-tu apprendre?"
    },
    themes: {
      animals: "Animaux",
      clothes: "Vêtements",
      colors: "Couleurs",
      food: "Nourriture",
      habitation: "Habitation",
      human_body: "Corps humain",
      nature: "Nature",
      numbers: "Nombres",
      social_life: "Vie sociale",
      society: "Société",
      time: "Temps",
      vegetals: "Végétaux"
    },
    lessons: {
      animals: {
        animals_basics: "Animaux",
        birds: "Oiseaux",
        farm_animals: "Animaux de la ferme",
        insects: "Insectes",
        mammals_1: "Mammifères",
        sea_animals: "Animaux marins"
      },
      clothes: {
        accessories: "Accessoires",
        clothes_basics: "Vêtements 1",
        more_clothes: "Vêtements 2"
      },
      colors: {
        main_colors: "Couleurs 1"
      },
      food: {
        agriculture: "Agriculture",
        drinks: "Boissons",
        food_basics: "Nourriture 1",
        foods: "Aliments",
        fruits: "Fruits",
        more_fruits_and_vegetables: "Fruits et légumes 2",
        vegetables: "Légumes"
      },
      habitation: {
        construction_materials: "Matériaux",
        construction_tools: "Outils",
        furniture: "Meubles",
        house: "Maison",
        housing: "Se loger",
        rooms: "Pièces"
      },
      human_body: {
        human_body_basics: "Corps humain",
        head: "Tête",
        limbs: "Membres",
        organs: "Organes",
        senses: "Sens"
      },
      nature: {
        earth: "La Terre",
        nature_basics: "Nature",
        sea: "Mer",
        universe: "Univers",
        weather_1: "Meteo 1",
        weather_2: "Meteo 2"
      },
      numbers: {
        first_numbers: "Premiers nombres",
        more_numbers: "Nombres suivants",
        large_numbers: "Grands nombres"
      },
      social_life: {
        close_family: "Famille proche",
        human_beings: "Êtres humains",
        identity: "Identité",
        introduction: "Rencontre"
      },
      society: {
        buildings: "Bâtiments",
        town: "Ville",
        transports: "Transports"
      },
      time: {
        days: "Jours",
        months: "Mois",
        time_basics: "Temps 1",
        time_description_1: "Temps 2",
        time_description_2: "Temps 3",
        time_divisions: "Mesurer le temps"
      },
      vegetals: {
        plants: "Plantes",
        trees: "Arbres",
        vegetals_basics: "Végétaux"
      }
    },
    start_exercise: "test",
    start_learning: "réviser",
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
