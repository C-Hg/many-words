import { put, call, select, takeEvery } from "redux-saga/effects";
import { types } from "../reducers/exercise";
import fetch from "../../services/fetch";
import FrEnWordSelector from "../../controllers/exercise_fetcher/word_selector/wordSelector.function";
import checkUserTranslation from "../../controllers/exercise_functions/checkUserTranslation.function";

function* submitUserTranslation() {
  try {
    const exercise = yield select(state => state.exercise);
    console.log(exercise.words[exercise.wordRank]);
    const result = checkUserTranslation(
      exercise.userTranslation,
      exercise.words[exercise.wordRank]
    );
    console.log(result);
    const isUserTranslationCorrect = result[0];

    yield put({ type: "UPDATE_RESULT", isUserTranslationCorrect });
    // if wrong answer, adds word to failedWords for restitution in recap
    if (!result[0]) {
      const expectedAnswer = result[1];
      yield put({ type: "UPDATE_FAILED_WORDS", expectedAnswer });
      this.setState(state => ({
        //allows rendering of the expect answer in the footer
        expectedAnswer: result[1],
        //pushes origin word and expected answer for lesson recap at the end of the session
        failedWords: [
          ...state.failedWords,
          [
            this.state.exerciseWords[this.state.wordRank][
              this.state.exerciseWords[this.state.wordRank].selectedForm[1]
            ][0],
            result[1]
          ]
        ]
      }));
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
        updateStats();
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

function* updateStats() {}

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

export default function* exerciseSaga() {
  yield takeEvery(types.GET_WORDS, getWords);
  yield takeEvery(types.NEXT_WORD, nextWord);
  yield takeEvery(types.SUBMIT_USER_TRANSLATION, submitUserTranslation);
}
