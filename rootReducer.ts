import { combineReducers } from '@reduxjs/toolkit'
import { formLoginReducers } from '@containers/FormLogin/reducer'
import { tagsReducers } from '@containers/PopularTags/reducer'
import { UserState } from '@containers/FormLogin/action'
import { TagState } from '@containers/PopularTags/action'

export interface StoreState {
  formLogin: UserState
  tags: TagState
}

const rootReducer = combineReducers({
  formLogin: formLoginReducers,
  tags: tagsReducers,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
