import { takeEvery, put, call } from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface FetchTodosAction {
  type: ActionTypes.fetchTodos;
  payload: Todo[];
}

export interface GetTodosAction {
  type: ActionTypes.getTodos;
  payload: Todo[];
}

export interface DeleteTodoAction {
  type: ActionTypes.deleteTodo;
  payload: number;
}

const url = 'http://jsonplaceholder.typicode.com/todos';

export const deleteTodo = (id: number): DeleteTodoAction => {
  return {
    type: ActionTypes.deleteTodo,
    payload: id
  };
};

export const fetchTodos = createAction(ActionTypes.fetchTodos);

export function* fetchTodosAsync() {
  const todos = () => axios.get<Todo[]>(url);
  const request = yield call(todos);
  yield put({
    type: ActionTypes.getTodos,
    payload: request.data
  });
}

export function* watchTodoSagas() {
  yield takeEvery(ActionTypes.fetchTodos, fetchTodosAsync);
}
