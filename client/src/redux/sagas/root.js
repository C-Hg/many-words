import { all, fork } from "redux-saga/effects";
import authSaga from "./auth";
import userSaga from "./user";
import exerciseSaga from "./exercise";
import learnSaga from "./learn";

export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(userSaga),
    fork(exerciseSaga),
    fork(learnSaga)
  ]);
}
