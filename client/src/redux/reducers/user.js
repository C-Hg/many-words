const defaultState = {
  isAuthenticated: false,
  language: "",
  stats: "",
  areStatsValid: false,
  activity: "",
  weakWordsDetails: "",
  login: {
    isDisconnecting: false,
    isDeletingAccount: false,
    hasConfirmed: false,
    hasProcedureSucceeded: false
  }
};

const types = {
  ATTEMPT_LOGIN: "ATTEMPT_LOGIN",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  BEGIN_LOGOUT: "BEGIN_LOGOUT",
  BEGIN_ACCOUNT_DELETION: "BEGIN_ACCOUNT_DELETION",
  CONFIRM_ACTION: "CONFIRM_ACTION",
  ATTEMPT_LOGOUT: "ATTEMPT_LOGOUT",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  UPDATE_STATS: "UPDATE_STATS",
  GET_STATS: "GET_STATS",
  OUTDATE_STATS: "OUTDATE_STATS",
  RESET_ACTIVITY: "RESET_ACTIVITY"
};

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      let stats = {
        lessonStats: action.user.lessonStats,
        themesStats: action.user.themesStats
      };
      return { ...state, isAuthenticated: true, stats };

    case types.BEGIN_LOGOUT:
      return { ...state, login: { ...state.login, isDisconnecting: true } };

    case types.BEGIN_ACCOUNT_DELETION:
      return { ...state, login: { ...state.login, isDeletingAccount: true } };

    case types.CONFIRM_ACTION:
      return { ...state, login: { ...state.login, hasConfirmed: true } };

    case types.LOGOUT_SUCCESS:
      return defaultState;

    case types.OUTDATE_STATS:
      return { ...state, areStatsValid: false };

    case types.UPDATE_STATS:
      console.log(action.stats);
      return { ...state, areStatsValid: true, stats: action.stats };

    case types.RESET_ACTIVITY:
      return { ...state, activity: "", weak_words_details: "" };

    default:
      return state;
  }
};

const actions = {
  attemptLogin: (provider, token) => {
    return {
      type: types.ATTEMPT_LOGIN,
      provider,
      token
    };
  },

  loginSuccess: user => {
    return {
      type: types.LOGIN_SUCCESS,
      user
    };
  },

  beginLogout: () => {
    return {
      type: types.BEGIN_LOGOUT
    };
  },

  beginAccountDeletion: () => {
    return {
      type: types.BEGIN_ACCOUNT_DELETION
    };
  },

  confirmAction: () => {
    return {
      type: types.CONFIRM_ACTION
    };
  },

  attemptLogout: () => {
    return {
      type: types.ATTEMPT_LOGOUT
    };
  },

  logoutSuccess: () => {
    return {
      type: types.LOGOUT_SUCCESS
    };
  },

  outdateUserStats: () => {
    return {
      type: types.OUTDATE_STATS
    };
  },

  getUserStats: () => {
    return {
      type: types.GET_STATS
    };
  },

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
