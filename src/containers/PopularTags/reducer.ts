import { createReducer } from '@reduxjs/toolkit'
import { ActionTypes } from './action'

const initialState = {
  status: null,
  tags: [],
}

export const tagsReducers = createReducer(initialState, {
  [ActionTypes.onTagsSetStatus]: (state, action) => {
    return {
      ...state,
      status: action.payload,
    }
  },
  [ActionTypes.setTags]: (state, action) => {
    return {
      ...state,
      tags: action.payload,
    }
  },
})
