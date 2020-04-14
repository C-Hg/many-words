import { put, call, select, takeEvery } from "redux-saga/effects";
import { types } from "../redux/reducers/learn";
import fetch from "../services/fetch";
import selectWordsToLearnForms from "../controllers/learning/selectWordsToLearnForms.controller";
import getAvailableSwitches from "../controllers/learning/getAvailableSwitches.function";

function* getWordsToLearn({ lesson }) {
  try {
    const words = yield call(fetch.getJSONResponse, `/api/learn/${lesson}`);
    const {
      hasNumberSwitch,
      hasGenderSwitch,
      hasDefiniteSwitch,
    } = getAvailableSwitches(words);
    const switchesStates = {
      number: "singular",
      gender: "masculine",
      isDefinite: true,
    };
    const formattedWords = selectWordsToLearnForms(switchesStates, words);
    const { number, gender, isDefinite } = switchesStates;
    yield put({
      type: "SET_WORDS",
      hasNumberSwitch,
      hasGenderSwitch,
      hasDefiniteSwitch,
      number,
      gender,
      isDefinite,
      formattedWords,
      words,
    });
  } catch (error) {
    console.error("[getWordsToLearn]", error);
  }
}

function* toggleNumber() {
  try {
    const learn = yield select(state => state.learn);
    const number = learn.number === "singular" ? "plural" : "singular";
    const switchesStates = {
      number,
      gender: learn.gender,
      isDefinite: learn.isDefinite,
    };
    const formattedWords = selectWordsToLearnForms(switchesStates, learn.words);
    yield put({ type: "SET_NUMBER", number, formattedWords });
  } catch (error) {
    console.error("[toggleNumber]", error);
  }
}

function* toggleGender() {
  try {
    const learn = yield select(state => state.learn);
    const gender = learn.gender === "masculine" ? "feminine" : "masculine";
    const switchesStates = {
      number: learn.number,
      gender,
      isDefinite: learn.isDefinite,
    };
    const formattedWords = selectWordsToLearnForms(switchesStates, learn.words);
    yield put({ type: "SET_GENDER", gender, formattedWords });
  } catch (error) {
    console.error("[toggleGender]", error);
  }
}

function* toggleIsDefinite() {
  try {
    const learn = yield select(state => state.learn);
    const isDefinite = !learn.isDefinite;
    const switchesStates = {
      number: learn.number,
      gender: learn.gender,
      isDefinite,
    };
    const formattedWords = selectWordsToLearnForms(switchesStates, learn.words);
    yield put({ type: "SET_DEFINITE", isDefinite, formattedWords });
  } catch (error) {
    console.error("[toggleIsDefinite]", error);
  }
}

export default function* learnSaga() {
  yield takeEvery(types.TOGGLE_NUMBER, toggleNumber);
  yield takeEvery(types.TOGGLE_GENDER, toggleGender);
  yield takeEvery(types.TOGGLE_IS_DEFINITE, toggleIsDefinite);
  yield takeEvery(types.GET_WORDS_TO_LEARN, getWordsToLearn);
}
