/* global fetch */

import { all } from 'redux-saga/effects'
import { watchFormLoginSagas } from '@containers/FormLogin/action'
import { watchPopularTagsSagas } from '@containers/PopularTags/action'

function* rootSaga() {
  yield all([watchFormLoginSagas(), watchPopularTagsSagas()])
}

export default rootSaga
