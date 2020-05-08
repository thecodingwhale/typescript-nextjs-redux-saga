import Router from 'next/router'
import { takeEvery, put, call } from 'redux-saga/effects'
import { createAction } from '@reduxjs/toolkit'
import { setCookie, destroyCookie } from 'nookies'
import UserAPI from '@lib/api/user'

export type LoginCredentials = {
  email: string
  password: string
}

export interface UserState {
  bio: string
  createdAt: string
  email: string
  id: number
  image: string
  token: string
  updatedAt: string
  username: string
}

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

export type FormSetStatusAction =
  | ActionTypes.formStatusSubmitting
  | ActionTypes.formStatusSuccess
  | ActionTypes.formStatusError

export const onFormLoginSubmit = createAction<LoginCredentials>(ActionTypes.onFormLoginSubmit)
export const onFormLoginSetStatus = createAction<FormSetStatusAction>(ActionTypes.onFormLoginSetStatus)
export const onFormLoginSuccess = createAction<object>(ActionTypes.onFormLoginSuccess)
export const onFormLoginLogout = createAction(ActionTypes.onFormLoginLogout)

export function* onFormLoginSubmitAsync(action) {
  yield put(onFormLoginSetStatus(ActionTypes.formStatusSubmitting))
  try {
    const response = yield call(UserAPI.login, <LoginCredentials>action.payload)
    yield put(onFormLoginSuccess(response))
    yield put(onFormLoginSetStatus(ActionTypes.formStatusSuccess))
    setCookie(null, 'token', response.token, {
      maxAge: 30 * 24 * 60 * 60,
    })
    yield call(Router.push, '/profile')
    yield put(onFormLoginSetStatus(null))
  } catch (error) {
    yield put(onFormLoginSetStatus(ActionTypes.formStatusError))
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
