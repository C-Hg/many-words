import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/root";
import userReducer from "./reducers/user";
import authReducer from "./reducers/auth";
import exerciseReducer from "../exercise/exercise.reducer";
import learnReducer from "./reducers/learn";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  exercise: exerciseReducer,
  learn: learnReducer,
});

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
