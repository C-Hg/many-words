import { put, call, select, takeEvery } from "redux-saga/effects";
import { types } from "../reducers/exercise";
import fetch from "../../services/fetch";
import FrEnWordSelector from "../../controllers/exercise/word_selector/wordSelector.function";
import checkUserTranslation from "../../controllers/exercise/checkUserTranslation.function";
import makeBatches from "../../controllers/exercise/weak_words/makeBatches.function";

function* getWords({ lesson, theme }) {
  try {
    yield put({ type: "BEGIN_EXERCISE" });
    const words = yield call(fetch.getJSONResponse, `/api/exercise/${lesson}`);
    const lessonWords = FrEnWordSelector(words, true);
    yield put({ type: "SET_LESSON_WORDS", lessonWords, theme });
  } catch (error) {}
}

function* getWeakWords({ reference = "curriculum" }) {
  try {
    yield put({ type: "BEGIN_EXERCISE" });
    const route = `/api/weak_words/${reference}`;
    const redirectionTarget = `/${reference}`;
    const rawWeakWords = yield call(fetch.getJSONResponse, route);
    const preparedWeakWords = FrEnWordSelector(rawWeakWords, false);
    const weakWordsBatches = makeBatches(preparedWeakWords);
    yield put({
      type: "SET_WEAK_WORDS",
      weakWordsBatches,
      reference,
      redirectionTarget
    });
  } catch (error) {}
}

function* continueWeakWords() {
  try {
    const exercise = yield select(state => state.exercise);
    const reference = exercise.weakWordsReference;
    if (exercise.weakWordsBatchesDone < exercise.weakWordsBatches.length - 1) {
      const nextBatch = exercise.weakWordsBatchesDone + 1;
      yield put({ type: "NEXT_BATCH", nextBatch });
    } else yield put({ type: "GET_WEAK_WORDS", reference });
  } catch (error) {}
}

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

    // if all the words of the current batch have been done
    if (exercise.wordRank === exercise.words.length - 1) {
      if (user.isAuthenticated) {
        yield call(updateStats);
      }
      yield put({ type: "PREPARE_RECAP" });
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
      `/api/stats/update_word_stats`,
      data
    );
    yield put({ type: "UPDATE_STATS", stats });
  } catch (error) {}
}

export default function* exerciseSaga() {
  yield takeEvery(types.GET_WORDS, getWords);
  yield takeEvery(types.GET_WEAK_WORDS, getWeakWords);
  yield takeEvery(types.CONTINUE_WEAK_WORDS, continueWeakWords);
  yield takeEvery(types.NEXT_WORD, nextWord);
  yield takeEvery(types.SUBMIT_USER_TRANSLATION, submitUserTranslation);
}
