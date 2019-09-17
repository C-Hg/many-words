import { put, call, takeEvery } from "redux-saga/effects";
import { types } from "../reducers/user";
import fetch from "../../services/fetch";

function* checkSession() {
  try {
    const stats = yield call(fetch.getJSONResponse, "/auth/session");
    if (stats.response === "user not connected") {
      console.debug("[checkSession] user not connected");
    } else {
      console.debug("[checkSession] successfully retrieved user stats");
      yield put({ type: "LOGIN_SUCCESS", stats });
    }
  } catch (error) {
    console.error("[checkSession] error while checking session", error);
  }
}

function* defineLanguage() {
  if (!/fr/i.test(window.navigator.language)) {
    yield put({
      type: "SET_LANGUAGE",
      language: "English"
    });
  } else {
    yield put({
      type: "SET_LANGUAGE",
      language: "French"
    });
  }
}

export default function* userSaga() {
  yield takeEvery(types.DEFINE_LANGUAGE, defineLanguage);
  yield takeEvery(types.CHECK_SESSION, checkSession);
}
