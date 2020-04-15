import { combineReducers } from '@reduxjs/toolkit';
import { todosReducers } from './todos';
import { Todo } from '../actions';

export interface StoreState {
  todos: Todo[];
}

const rootReducer = combineReducers({
  todos: todosReducers
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
