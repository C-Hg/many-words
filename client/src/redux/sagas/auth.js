import { put, call, takeEvery } from "redux-saga/effects";
import fetch from "../../services/fetch";
import { types } from "../reducers/auth";

//login or restore session to keep one single consistent login flow ?

function* socialLogin({ provider, token }) {
  try {
    const user = yield call(fetch.socialLogin, provider, token);
    console.log(user, user.lessonsStats);
    const stats = {
      globalProgress: user.globalProgress,
      lessonsStats: user.lessonsStats,
      themesStats: user.themesStats
    };
    yield put({ type: "LOGIN_SUCCESS", stats });
  } catch (error) {
    yield put({ type: "LOGIN_ERROR", error });
  }
}

function* logout() {
  try {
    const response = yield call(fetch.getTextResponse, `/auth/logout`);
    console.log(response);
    if (response === "user logged out") {
      yield put({ type: "LOGOUT_SUCCESS" });
    } else {
      yield put({ type: "LOGOUT_ERROR" });
    }
  } catch (error) {
    yield put({ type: "LOGOUT_ERROR", error });
  }
}

function* deleteUserAccount() {
  try {
    const response = yield call(fetch.getTextResponse, `/auth/delete_user`);
    if (response === "user deleted and logged out") {
      yield put({ type: "LOGOUT_SUCCESS" });
    } else {
      yield put({ type: "LOGOUT_ERROR" });
    }
  } catch (error) {
    yield put({ type: "LOGOUT_ERROR", error });
  }
}

export default function* authSaga() {
  yield takeEvery(types.ATTEMPT_LOGOUT, logout);
  yield takeEvery(types.ATTEMPT_LOGIN, socialLogin);
  yield takeEvery(types.CONFIRM_DELETION, deleteUserAccount);
}
