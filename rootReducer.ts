import { combineReducers } from '@reduxjs/toolkit';
import { todosReducers } from './src/containers/Todo/reducer';
import { Todo } from './src/containers/Todo/action';

export interface StoreState {
  todos: Todo[];
}

const rootReducer = combineReducers({
  todos: todosReducers
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
