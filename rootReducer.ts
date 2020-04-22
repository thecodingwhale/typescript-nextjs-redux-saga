import { combineReducers } from '@reduxjs/toolkit'
import { todosReducers } from '@containers/Todo/reducer'
import { formLoginReducers } from '@containers/FormLogin/reducer'
import { Todo } from '@containers/Todo/action'

export interface StoreState {
  todos: Todo[]
}

const rootReducer = combineReducers({
  todos: todosReducers,
  formLogin: formLoginReducers,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
