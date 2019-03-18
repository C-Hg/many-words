import { put, call, takeEvery } from "redux-saga/effects";
import { types } from "../reducers/user";
import { languages } from "../../contexts/language-context";
import fetch from "../../services/fetch";

function* checkSession() {
  try {
    const user = yield call(fetch.getJSONResponse, "/auth/session");
    const stats = {
      globalProgress: user.globalProgress,
      lessonsStats: user.lessonsStats,
      themesStats: user.themesStats
    };
    yield put({ type: "LOGIN_SUCCESS", stats });
  } catch (error) {}
}

function* defineLanguage() {
  if (!/fr/i.test(window.navigator.language)) {
    yield put({ type: "SET_LANGUAGE", language: languages.English });
  } else {
    yield put({ type: "SET_LANGUAGE", language: languages.French });
  }
}

export default function* userSaga() {
  yield takeEvery(types.DEFINE_LANGUAGE, defineLanguage);
  yield takeEvery(types.CHECK_SESSION, checkSession);
}
