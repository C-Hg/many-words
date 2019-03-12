import { put, call, all, takeEvery } from "redux-saga/effects";
import fetch from "../../services/fetch";
import { types } from "../reducers/user";

//login or restore session to keep one single consistent login flow ?

function* getStats() {
  try {
    const stats = yield call(fetch.get, `/api/tracking/user_stats`);
    console.log("stats: ", stats);
    yield put({ type: "UPDATE_STATS", stats });
  } catch (error) {}
}

function* socialLogin({ provider, token }) {
  try {
    const user = yield call(fetch.socialLogin, provider, token);
    yield put({ type: "LOGIN_SUCCESS", user });
  } catch (error) {
    yield put({ type: "LOGIN_ERROR", error });
  }
}

function* attemptLogout() {
  try {
    const response = yield call(fetch.get, `/auth/logout`);
    if (response === "user logged out") {
      yield put({ type: "LOGOUT_SUCCESS" });
    } else {
      yield put({ type: "LOGOUT_ERROR" });
    }
  } catch (error) {
    yield put({ type: "LOGOUT_ERROR", error });
  }
}

function* userSaga() {
  yield takeEvery(types.ATTEMPT_LOGOUT, attemptLogout);
  yield takeEvery(types.ATTEMPT_LOGIN, socialLogin);
  yield takeEvery(types.GET_STATS, getStats);
}

export default function* rootSaga() {
  yield all([userSaga()]);
}
