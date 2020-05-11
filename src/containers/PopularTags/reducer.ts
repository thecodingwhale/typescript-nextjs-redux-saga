import { createReducer } from '@reduxjs/toolkit'
import { ActionTypes, TagState, TagsSetStatusAction } from './action'

interface SetStatusActions {
  type: ActionTypes.onTagsSetStatus
  payload: TagsSetStatusAction
}

interface SetTagsActions {
  type: ActionTypes.setTags
  payload: string[]
}

const initialState: TagState = {
  status: null,
  data: [],
}

export const tagsReducers = createReducer(initialState, {
  [ActionTypes.onTagsSetStatus]: (state: TagState, action: SetStatusActions) => {
    return {
      ...state,
      status: action.payload,
    }
  },
  [ActionTypes.setTags]: (state: TagState, action: SetTagsActions) => {
    return {
      ...state,
      data: action.payload,
    }
  },
})
