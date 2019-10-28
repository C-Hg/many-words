const defaultState = {
  number: "",
  gender: "",
  isDefinite: false,
  formattedWords: "",
  words: "",
};

const types = {
  GET_WORDS_TO_LEARN: "GET_WORDS_TO_LEARN",
  SET_WORDS: "SET_WORDS",
  TOGGLE_NUMBER: "TOGGLE_NUMBER",
  TOGGLE_GENDER: "TOGGLE_GENDER",
  TOGGLE_DEFINITE: "TOGGLE_DEFINITE",
  SET_NUMBER: "SET_NUMBER",
  SET_GENDER: "SET_GENDER",
  SET_DEFINITE: "SET_DEFINITE",
};

const learnReducer = (state = defaultState, action) => {
  const { words, formattedWords, number, gender, isDefinite } = action;

  switch (action.type) {
    case types.SET_WORDS:
      return {
        words,
        formattedWords,
        number,
        gender,
        isDefinite,
      };

    case types.SET_NUMBER:
      return {
        ...state,
        number,
        formattedWords,
      };

    case types.SET_GENDER:
      return {
        ...state,
        gender,
        formattedWords,
      };

    case types.SET_DEFINITE:
      return {
        ...state,
        isDefinite,
        formattedWords,
      };

    default:
      return state;
  }
};

const actions = {
  getWordsToLearn: lesson => {
    return {
      type: types.GET_WORDS_TO_LEARN,
      lesson,
    };
  },

  toggleNumber: () => {
    return {
      type: types.TOGGLE_NUMBER,
    };
  },

  toggleGender: () => {
    return {
      type: types.TOGGLE_GENDER,
    };
  },

  toggleIsDefinite: () => {
    return {
      type: types.TOGGLE_IS_DEFINITE,
    };
  },
};

export default learnReducer;

export { actions, types };
