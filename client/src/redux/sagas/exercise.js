import { put, call, select, takeEvery } from "redux-saga/effects";
import { types } from "../reducers/exercise";
import fetch from "../../services/fetch";
import FrEnWordSelector from "../../controllers/exercise_fetcher/word_selector/wordSelector.function";
import checkUserTranslation from "../../controllers/exercise_functions/checkUserTranslation.function";

function* getWords({ lesson }) {
  try {
    const exercise = yield select(state => state.exercise);
    if (exercise.weak_words_mode) {
      yield call(getWeakWords);
    } else {
      const words = yield call(
        fetch.getJSONResponse,
        `/api/exercise/${lesson}`
      );
      const lessonWords = FrEnWordSelector(words, true);
      yield put({ type: "SET_LESSON_WORDS", lessonWords });
    }
  } catch (error) {}
}

function* getWeakWords() {}

function* submitUserTranslation() {
  try {
    const exercise = yield select(state => state.exercise);
    const result = checkUserTranslation(
      exercise.userTranslation,
      exercise.words[exercise.wordRank]
    );
    const isUserTranslationCorrect = result[0];
    yield put({ type: "UPDATE_RESULT", isUserTranslationCorrect });

    // if wrong answer, adds word to failedWords for restitution in recap and immediately in the footer via expectedAnswer
    if (!result[0]) {
      const expectedAnswer = result[1];
      yield put({ type: "UPDATE_FAILED_WORDS", expectedAnswer });
    }
  } catch (error) {}
}

function* nextWord() {
  try {
    const exercise = yield select(state => state.exercise);
    const user = yield select(state => state.user);
    console.log(exercise.wordRank, exercise.words.length - 1);

    // if all the words of the current batch have been done
    if (exercise.wordRank === exercise.words.length - 1) {
      if (user.isAuthenticated) {
        yield call(updateStats);
      }
      yield put({ type: "PREPARE_RECAP" });
      if (exercise.weak_words_mode) {
        yield put({ type: "INCREMENT_BATCHES_DONE" });
      }
    } else {
      yield put({ type: "PREPARE_NEXT_WORD" });
    }
  } catch (error) {}
}

function* updateStats() {
  try {
    const exercise = yield select(state => state.exercise);
    const data = JSON.stringify(exercise.result);
    // updates stats on server and get up-to-date user stats
    const stats = yield call(
      fetch.postJSONResponse,
      `/api/tracking/update_word_stats`,
      data
    );
    yield put({ type: "UPDATE_STATS", stats });
  } catch (error) {}
}

function* restartExercise() {
  try {
    yield put({ type: "RESET_STATE" });
  } catch (e) {}
}

export default function* exerciseSaga() {
  yield takeEvery(types.GET_WORDS, getWords);
  yield takeEvery(types.NEXT_WORD, nextWord);
  yield takeEvery(types.SUBMIT_USER_TRANSLATION, submitUserTranslation);
  yield takeEvery(types.RESTART_EXERCISE, restartExercise);
}
