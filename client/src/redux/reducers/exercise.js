const defaultState = {
  weak_words_mode: false,
  weak_words_batches_done: 0,
  weakWordsContext: "",
  status: "exercise",
  words: "",
  wordRank: 0,
  userTranslation: "",
  expectedAnswer: "",
  checking: false,
  correctAnswer: false,
  activable: false,
  redirect: false,
  specialCharactersVisible: false,
  failedWords: [],
  result: []
};

const types = {
  GET_WORDS: "GET_WORDS",
  GET_WEAK_WORDS: "GET_WEAK_WORDS",
  UPDATE_USER_TRANSLATION: "UPDATE_USER_TRANSLATION",
  SUBMIT_USER_TRANSLATION: "SUBMIT_USER_TRANSLATION",
  UPDATE_RESULT: "UPDATE_RESULT",
  UPDATE_FAILED_WORDS: "UPDATE_FAILED_WORDS",
  NEXT_WORD: "NEXT_WORD",
  PREPARE_NEXT_WORD: "PREPARE_NEXT_WORD",
  PREPARE_RECAP: "PREPARE_RECAP",
  RESTART_EXERCISE: "RESTART_EXERCISE",
  INCREMENT_BATCHES_DONE: "INCREMENT_BATCHES_DONE",
  SET_LESSON_WORDS: "SET_LESSON_WORDS",
  RESET_STATE: "RESET_STATE"
};

const exerciseReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.SET_LESSON_WORDS:
      return { ...state, words: action.lessonWords };

    case types.UPDATE_USER_TRANSLATION:
      return { ...state, userTranslation: action.userTranslation };

    case types.UPDATE_RESULT:
      return {
        ...state,
        checking: true,
        correctAnswer: action.isUserTranslationCorrect,
        result: [
          ...state.result,
          [
            ...state.words[state.wordRank].selectedForm,
            action.isUserTranslationCorrect
          ]
        ]
      };

    case types.UPDATE_FAILED_WORDS:
      return {
        ...state,
        expectedAnswer: action.expectedAnswer,
        failedWords: [
          ...state.failedWords,
          [
            state.words[state.wordRank][
              state.words[state.wordRank].selectedForm[1]
            ][0],
            action.expectedAnswer
          ]
        ]
      };

    case types.PREPARE_RECAP:
      return {
        ...state,
        status: "recap",
        checking: false,
        specialCharactersVisible: false
      };

    case types.PREPARE_NEXT_WORD:
      return {
        ...state,
        wordRank: state.wordRank + 1,
        userTranslation: "",
        checking: false,
        correctAnswer: false,
        expectedAnswer: "",
        specialCharactersVisible: false
      };

    case types.RESET_STATE:
      return defaultState;

    case types.INCREMENT_BATCHES_DONE:
      return {
        ...state,
        weak_words_batches_done: state.weak_words_batches_done + 1
      };

    default:
      return state;
  }
};

const actions = {
  getWords: lesson => {
    return {
      type: types.GET_WORDS,
      lesson
    };
  },

  updateUserTranslation: userTranslation => {
    return {
      type: types.UPDATE_USER_TRANSLATION,
      userTranslation
    };
  },

  submitUserTranslation: () => {
    return {
      type: types.SUBMIT_USER_TRANSLATION
    };
  },

  getWeakWords: lesson => {
    return {
      type: types.GET_WEAK_WORDS,
      lesson
    };
  },

  nextWord: () => {
    return {
      type: types.NEXT_WORD
    };
  },

  restartExercise: () => {
    return {
      type: types.RESTART_EXERCISE
    };
  }
};

export default exerciseReducer;

export { actions, types };
