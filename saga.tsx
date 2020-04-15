/* global fetch */

import { all } from 'redux-saga/effects';
import { watchTodoSagas } from './actions';

function* rootSaga() {
  yield all([watchTodoSagas()]);
}

export default rootSaga;
