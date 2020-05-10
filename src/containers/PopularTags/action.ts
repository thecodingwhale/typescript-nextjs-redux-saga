import { createAction } from '@reduxjs/toolkit'
import { takeEvery, call, put } from 'redux-saga/effects'
import TagApi from '@lib/api/tag'

export interface TagState {
  name: string
}

export enum ActionTypes {
  onFetchTags = 'POPULAR_TAGS/ON_FETCH_TAGS',
  onTagsSetStatus = 'POPULAR_TAGS/ON_SET_STATUS',
  onTagsFetching = 'POPULAR_TAGS/ON_FETCHING',
  onTagsError = 'POPULAR_TAGS/ON_ERROR',
  setTags = 'POPULAR_TAGS/SET_TAGS',
}

export type TagsSetStatusAction = ActionTypes.onTagsFetching | ActionTypes.onTagsError

export const fetchTags = createAction(ActionTypes.onFetchTags)
export const onTagsSetStatus = createAction<TagsSetStatusAction>(ActionTypes.onTagsSetStatus)
export const setTags = createAction<TagState[]>(ActionTypes.setTags)

export function* onFetchTagsAsync() {
  yield put(onTagsSetStatus(ActionTypes.onTagsFetching))
  try {
    const response = yield call(TagApi.tags)
    yield put(setTags(response))
    yield put(onTagsSetStatus(null))
  } catch (error) {
    yield put(onTagsSetStatus(ActionTypes.onTagsError))
  }
}

export function* watchPopularTagsSagas() {
  yield takeEvery(ActionTypes.onFetchTags, onFetchTagsAsync)
}
