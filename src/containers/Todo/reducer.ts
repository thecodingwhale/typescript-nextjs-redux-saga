import { createReducer } from '@reduxjs/toolkit'
import { Todo, ActionTypes, GetTodosAction, DeleteTodoAction } from './action'

const initialState = []
export const todosReducers = createReducer(initialState, {
  [ActionTypes.getTodos]: (state: Todo[] = [], action: GetTodosAction) => action.payload,
  [ActionTypes.deleteTodo]: (state: Todo[] = [], action: DeleteTodoAction) =>
    state.filter((todo: Todo) => todo.id !== action.payload),
})
