import { combineReducers } from 'redux';
import { todosReducers } from './todos';
import { Todo } from '../actions';

export interface StoreState {
  todos: Todo[];
}

const rootReducers = combineReducers<StoreState>({
  todos: todosReducers
});

export default rootReducers;
