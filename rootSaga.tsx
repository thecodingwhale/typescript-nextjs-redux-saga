/* global fetch */

import { all } from 'redux-saga/effects';
import { watchTodoSagas } from './src/containers/Todo/action';

function* rootSaga() {
  yield all([watchTodoSagas()]);
}

export default rootSaga;
