const defaultState = {
  isDisconnecting: false,
  isDeletingAccount: false,
  hasConfirmedDeletion: false,
  hasProcedureSucceeded: false,
  hasAcknowledgedAction: true
};

const types = {
  ATTEMPT_LOGIN: "ATTEMPT_LOGIN",
  ATTEMPT_LOGOUT: "ATTEMPT_LOGOUT",
  BEGIN_LOGOUT: "BEGIN_LOGOUT",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  BEGIN_ACCOUNT_DELETION: "BEGIN_ACCOUNT_DELETION",
  ABORT_DELETION: "ABORT_DELETION",
  CONFIRM_DELETION: "CONFIRM_DELETION",
  DELETION_SUCCESS: "DELETION_SUCCESS",
  ACKNOWLEDGE_ACTION: "ACKNOWLEDGE_ACTION"
};

const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    // fetch stats on login +++
    case types.ATTEMPT_LOGOUT:
      return {
        ...state,
        isDisconnecting: true,
        hasAcknowledgedAction: false
      };

    case types.LOGOUT_SUCCESS:
      return { ...state, hasProcedureSucceeded: true };

    case types.BEGIN_ACCOUNT_DELETION:
      return {
        ...state,
        isDeletingAccount: true,
        hasAcknowledgedAction: false
      };

    case types.ABORT_DELETION:
      return { ...state, isDeletingAccount: false };

    case types.CONFIRM_DELETION:
      return {
        ...state,
        hasConfirmedDeletion: true
      };

    case types.ACKNOWLEDGE_ACTION:
      return defaultState;

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

  attemptLogout: () => {
    return {
      type: types.ATTEMPT_LOGOUT
    };
  },

  beginAccountDeletion: () => {
    return {
      type: types.BEGIN_ACCOUNT_DELETION
    };
  },

  confirmDeletion: () => {
    return {
      type: types.CONFIRM_DELETION
    };
  },

  abortDeletion: () => {
    return {
      type: types.ABORT_DELETION
    };
  },

  acknowledgeAction: () => {
    return {
      type: types.ACKNOWLEDGE_ACTION
    };
  }
};

export default authReducer;

export { actions, types };
