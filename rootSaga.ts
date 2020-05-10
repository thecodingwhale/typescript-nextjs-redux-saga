/* global fetch */

import { all } from 'redux-saga/effects'
import { watchTodoSagas } from '@containers/Todo/action'
import { watchFormLoginSagas } from '@containers/FormLogin/action'
import { watchPopularTagsSagas } from '@containers/PopularTags/action'

function* rootSaga() {
  yield all([watchTodoSagas(), watchFormLoginSagas(), watchPopularTagsSagas()])
}

export default rootSaga
