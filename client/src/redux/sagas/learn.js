import { put, call, select, takeEvery } from "redux-saga/effects";
import { types } from "../reducers/learn";
import fetch from "../../services/fetch";
import selectWordsToLearnForms from "../../controllers/learning/selectWordsToLearnForms.controller";
import getSwitchesStates from "../../controllers/learning/getSwitchesStates.function";

function* getWordsToLearn({ lesson }) {
  try {
    console.log("hello from getWords");
    const words = yield call(fetch.getJSONResponse, `/api/learn/${lesson}`);
    const switches = getSwitchesStates(words);
    const formattedWords = selectWordsToLearnForms(
      switches[0],
      switches[1],
      switches[2],
      words
    );
    yield put({
      type: "SET_WORDS",
      number: switches[0],
      gender: switches[1],
      definite: switches[2],
      formattedWords,
      words
    });
  } catch (error) {}
}

function* toggleNumber() {
  try {
    const learn = yield select(state => state.learn);
    const number = learn.number === "singular" ? "plural" : "singular";
    const formattedWords = yield call(
      selectWordsToLearnForms,
      number,
      learn.gender,
      learn.definite,
      learn.words
    );
    yield put({ type: "SET_NUMBER", number, formattedWords });
  } catch (error) {}
}

function* toggleGender() {
  try {
    const learn = yield select(state => state.learn);
    const gender = learn.gender === "masculine" ? "feminine" : "masculine";
    const formattedWords = yield call(
      selectWordsToLearnForms,
      learn.number,
      gender,
      learn.definite,
      learn.words
    );
    yield put({ type: "SET_GENDER", gender, formattedWords });
  } catch (error) {}
}

function* toggleDefinite() {
  try {
    const learn = yield select(state => state.learn);
    const definite = learn.definite === "definite" ? "indefinite" : "definite";
    const formattedWords = yield call(
      selectWordsToLearnForms,
      learn.number,
      learn.gender,
      definite,
      learn.words
    );
    yield put({ type: "SET_DEFINITE", definite, formattedWords });
  } catch (error) {}
}

export default function* learnSaga() {
  yield takeEvery(types.TOGGLE_NUMBER, toggleNumber);
  yield takeEvery(types.TOGGLE_GENDER, toggleGender);
  yield takeEvery(types.TOGGLE_DEFINITE, toggleDefinite);
  yield takeEvery(types.GET_WORDS_TO_LEARN, getWordsToLearn);
}
