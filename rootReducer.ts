import { combineReducers } from '@reduxjs/toolkit'
import { todosReducers } from '@containers/Todo/reducer'
import { Todo } from '@containers/Todo/action'

export interface StoreState {
  todos: Todo[]
}

const rootReducer = combineReducers({
  todos: todosReducers,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
