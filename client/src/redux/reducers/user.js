const defaultState = {
  isAuthenticated: false,
  language: "",
  stats: ""
};

const types = {
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  CHECK_SESSION: "CHECK_SESSION",
  DEFINE_LANGUAGE: "DEFINE_LANGUAGE",
  SET_LANGUAGE: "SET_LANGUAGE",
  UPDATE_STATS: "UPDATE_STATS",
  RESET_ACTIVITY: "RESET_ACTIVITY"
};

const userReducer = (state = defaultState, action) => {
  const stats = action.stats;
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return { ...state, isAuthenticated: true, stats };

    case types.LOGOUT_SUCCESS:
      return { ...state, isAuthenticated: false, stats: "" };

    case types.SET_LANGUAGE:
      return { ...state, language: action.language };

    case types.UPDATE_STATS:
      return { ...state, stats };

    case types.RESET_ACTIVITY:
      return { ...state, activity: "", weak_words_details: "" };

    default:
      return state;
  }
};

const actions = {
  updateUserStats: stats => {
    return {
      type: types.UPDATE_STATS,
      stats
    };
  },

  resetActivity: () => {
    return {
      type: types.RESET_ACTIVITY
    };
  },

  defineLanguage: () => {
    return {
      type: types.DEFINE_LANGUAGE
    };
  },

  checkSession: () => {
    return {
      type: types.CHECK_SESSION
    };
  }
};

export default userReducer;

export { actions, types };
