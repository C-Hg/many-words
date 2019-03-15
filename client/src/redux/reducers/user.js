const defaultState = {
  isAuthenticated: false,
  language: "",
  stats: "",
  activity: "",
  weakWordsDetails: ""
};

const types = {
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  UPDATE_STATS: "UPDATE_STATS",
  RESET_ACTIVITY: "RESET_ACTIVITY"
};

const userReducer = (state = defaultState, action) => {
  const stats = action.stats;
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return { ...state, isAuthenticated: true, stats };

    case types.LOGOUT_SUCCESS:
      return defaultState;

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
  }
};

export default userReducer;

export { actions, types };
