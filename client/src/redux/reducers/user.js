const defaultState = {
  isAuthenticated: false,
  language: "",
  stats: "",
  areStatsValid: false,
  activity: "",
  weak_words_details: ""
};

const types = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT"
};

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return { ...state, isAuthenticated: true };

    case types.LOGOUT:
      return { ...state, isAuthenticated: false };

    default:
      return state;
  }
};

const actions = {
  login: () => {
    return {
      type: types.LOGIN
    };
  },

  logout: () => {
    return {
      type: types.LOGOUT
    };
  }
};

export default userReducer;

export { actions, types };
