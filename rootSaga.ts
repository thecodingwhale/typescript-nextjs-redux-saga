/* global fetch */

import { all } from 'redux-saga/effects'
import { watchTodoSagas } from '@containers/Todo/action'
import { watchFormLoginSagas } from '@containers/FormLogin/action'

function* rootSaga() {
  yield all([watchTodoSagas(), watchFormLoginSagas()])
}

export default rootSaga
