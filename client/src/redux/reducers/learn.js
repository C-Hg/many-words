const defaultState = {
  number: "",
  gender: "",
  definite: "",
  formattedWords: "",
  words: ""
};

const types = {
  GET_WORDS_TO_LEARN: "GET_WORDS_TO_LEARN",
  SET_WORDS: "SET_WORDS",
  TOGGLE_NUMBER: "TOGGLE_NUMBER",
  TOGGLE_GENDER: "TOGGLE_GENDER",
  TOGGLE_DEFINITE: "TOGGLE_DEFINITE",
  SET_NUMBER: "SET_NUMBER",
  SET_GENDER: "SET_GENDER",
  SET_DEFINITE: "SET_DEFINITE"
};

const learnReducer = (state = defaultState, action) => {
  const words = action.words;
  const formattedWords = action.formattedWords;
  const number = action.number;
  const gender = action.gender;
  const definite = action.definite;

  switch (action.type) {
    case types.SET_WORDS:
      return {
        words,
        formattedWords,
        number,
        gender,
        definite
      };

    case types.SET_NUMBER:
      return {
        ...state,
        number,
        formattedWords
      };

    case types.SET_GENDER:
      return {
        ...state,
        gender,
        formattedWords
      };

    case types.SET_DEFINITE:
      return {
        ...state,
        definite,
        formattedWords
      };

    default:
      return state;
  }
};

const actions = {
  getWordsToLearn: lesson => {
    return {
      type: types.GET_WORDS_TO_LEARN,
      lesson
    };
  },

  toggleNumber: () => {
    return {
      type: types.TOGGLE_NUMBER
    };
  },

  toggleGender: () => {
    return {
      type: types.TOGGLE_GENDER
    };
  },

  toggleDefinite: () => {
    return {
      type: types.TOGGLE_DEFINITE
    };
  }
};

export default learnReducer;

export { actions, types };
