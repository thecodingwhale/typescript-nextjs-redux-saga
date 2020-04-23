import Router from 'next/router'
import { takeEvery, put, call } from 'redux-saga/effects'
import axios from 'axios'
import { createAction } from '@reduxjs/toolkit'
import { setCookie, destroyCookie } from 'nookies'

export type FormData = {
  email: string
  password: string
}

export enum ActionTypes {
  onFormLoginLogout = 'FORM_LOGIN/ON_LOGOUT',
  onFormLoginSubmit = 'FORM_LOGIN/ON_SUBMIT',
  onFormLoginSetStatus = 'FORM_LOGIN/SET_STATUS',
  onFormLoginSuccess = 'FORM_LOGIN/SUCCESS',
  formStatusSubmitting = 'FORM_LOGIN/SUBMITTING',
  formStatusError = 'FORM_LOGIN/ERROR',
  formStatusSuccess = 'FORM_LOGIN/SUCCESS',
}

export const onFormLoginSubmit = createAction<FormData>(ActionTypes.onFormLoginSubmit)
export const onFormLoginSetStatus = createAction<string>(ActionTypes.onFormLoginSetStatus)
export const onFormLoginSuccess = createAction<object>(ActionTypes.onFormLoginSuccess)
export const onFormLoginLogout = createAction(ActionTypes.onFormLoginLogout)

export function* onFormLoginSubmitAsync(action) {
  yield put(onFormLoginSetStatus(ActionTypes.formStatusSubmitting))
  try {
    const { email, password } = <FormData>action.payload
    const login = () =>
      axios.post('https://conduit.productionready.io/api/users/login', {
        user: {
          email,
          password,
        },
      })
    const response = yield call(login)
    yield put(onFormLoginSuccess(response.data.user))
    yield put(onFormLoginSetStatus(ActionTypes.formStatusSuccess))
    setCookie(null, 'token', response.data.user.token, {
      maxAge: 30 * 24 * 60 * 60,
    })
    yield call(Router.push, '/profile')
    yield put(onFormLoginSetStatus(null))
  } catch (error) {
    yield put(onFormLoginSetStatus(ActionTypes.formStatusError))
    console.log(error.response)
  }
}

export function* onFormLoginLogoutAsync() {
  destroyCookie(null, 'token')
  yield call(Router.push, '/login')
}

export function* watchFormLoginSagas() {
  yield takeEvery(ActionTypes.onFormLoginSubmit, onFormLoginSubmitAsync)
  yield takeEvery(ActionTypes.onFormLoginLogout, onFormLoginLogoutAsync)
}
