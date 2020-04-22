import { createReducer } from '@reduxjs/toolkit'
import { ActionTypes } from './action'

const initialState = {
  status: null,
  user: null,
}

export const formLoginReducers = createReducer(initialState, {
  [ActionTypes.onFormLoginSetStatus]: (state, action) => {
    return {
      ...state,
      status: action.payload,
    }
  },
  [ActionTypes.onFormLoginSuccess]: (state, action) => {
    return {
      ...state,
      user: action.payload,
    }
  },
})
