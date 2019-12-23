const defaultState = {
  isWeakWordsMode: false,
  weakWordsBatches: [],
  weakWordsBatchesDone: 0,
  weakWordsReference: null,
  status: "exercise",
  words: null,
  wordRank: 0,
  userTranslation: "",
  expectedAnswer: "",
  isChecking: false,
  isAnswerCorrect: false,
  activable: false,
  areSpecialCharactersVisible: false,
  capitalized: true,
  failedWords: [],
  result: [],
  redirect: true,
  redirectionTarget: "",
};

const types = {
  ADD_LETTER: "ADD_LETTER",
  BEGIN_EXERCISE: "BEGIN_EXERCISE",
  GET_WORDS: "GET_WORDS",
  GET_WEAK_WORDS: "GET_WEAK_WORDS",
  UPDATE_USER_TRANSLATION: "UPDATE_USER_TRANSLATION",
  SUBMIT_USER_TRANSLATION: "SUBMIT_USER_TRANSLATION",
  TOGGLE_SPECIAL_CHARACTERS: "TOGGLE_SPECIAL_CHARACTERS",
  UPDATE_RESULT: "UPDATE_RESULT",
  UPDATE_FAILED_WORDS: "UPDATE_FAILED_WORDS",
  NEXT_WORD: "NEXT_WORD",
  PREPARE_NEXT_WORD: "PREPARE_NEXT_WORD",
  PREPARE_RECAP: "PREPARE_RECAP",
  RESTART_EXERCISE: "RESTART_EXERCISE",
  CONTINUE_WEAK_WORDS: "CONTINUE_WEAK_WORDS",
  NEXT_BATCH: "NEXT_BATCH",
  SET_LESSON_WORDS: "SET_LESSON_WORDS",
  SET_WEAK_WORDS: "SET_WEAK_WORDS",
  RESET_STATE: "RESET_STATE",
  QUIT_EXERCISE: "QUIT_EXERCISE",
};

const exerciseReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.SET_LESSON_WORDS:
      return {
        ...state,
        redirect: false,
        words: action.lessonWords,
        redirectionTarget: `/${action.theme}`,
      };

    case types.SET_WEAK_WORDS:
      return {
        ...state,
        redirect: false,
        weakWordsBatches: action.weakWordsBatches,
        isWeakWordsMode: true,
        weakWordsReference: action.reference,
        words: action.weakWordsBatches[0],
        redirectionTarget: action.redirectionTarget,
      };

    case types.BEGIN_EXERCISE:
      return { ...defaultState, redirect: false };

    case types.TOGGLE_SPECIAL_CHARACTERS:
      return { ...state, areSpecialCharactersVisible: true };

    case types.UPDATE_USER_TRANSLATION:
      return { ...state, userTranslation: action.userTranslation };

    case types.UPDATE_RESULT:
      return {
        ...state,
        isChecking: true,
        isAnswerCorrect: action.isUserTranslationCorrect,
        result: [
          ...state.result,
          [
            ...state.words[state.wordRank].selectedForm,
            action.isUserTranslationCorrect,
          ],
        ],
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
            action.expectedAnswer,
          ],
        ],
      };

    case types.PREPARE_RECAP:
      return {
        ...state,
        status: "recap",
        isChecking: false,
        areSpecialCharactersVisible: false,
      };

    case types.PREPARE_NEXT_WORD:
      return {
        ...state,
        wordRank: state.wordRank + 1,
        userTranslation: "",
        isChecking: false,
        isAnswerCorrect: false,
        expectedAnswer: "",
        areSpecialCharactersVisible: false,
        capitalized: true,
      };

    case types.RESET_STATE:
      return defaultState;

    case types.NEXT_BATCH:
      return {
        ...defaultState,
        redirect: false,
        isWeakWordsMode: true,
        weakWordsBatches: state.weakWordsBatches,
        weakWordsBatchesDone: state.weakWordsBatchesDone + 1,
        weakWordsReference: state.weakWordsReference,
        words: state.weakWordsBatches[action.nextBatch],
        redirectionTarget: state.redirectionTarget,
      };

    case types.QUIT_EXERCISE:
      return { ...defaultState, redirectionTarget: state.redirectionTarget };

    default:
      return state;
  }
};

const actions = {
  getWords: (lesson, theme) => {
    return {
      type: types.GET_WORDS,
      lesson,
      theme,
    };
  },

  getWeakWords: reference => {
    return {
      type: types.GET_WEAK_WORDS,
      reference,
    };
  },

  toggleSpecialCharacters: () => {
    return {
      type: types.TOGGLE_SPECIAL_CHARACTERS,
    };
  },

  updateUserTranslation: userTranslation => {
    return {
      type: types.UPDATE_USER_TRANSLATION,
      userTranslation,
    };
  },

  submitUserTranslation: () => {
    return {
      type: types.SUBMIT_USER_TRANSLATION,
    };
  },

  nextWord: () => {
    return {
      type: types.NEXT_WORD,
    };
  },

  resetState: () => {
    return {
      type: types.RESET_STATE,
    };
  },
};

export default exerciseReducer;

export { actions, types };
