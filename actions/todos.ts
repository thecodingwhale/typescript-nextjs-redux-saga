import { takeEvery, put, call } from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';
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

export const fetchTodos = createAction(ActionTypes.fetchTodos);

export const deleteTodo = createAction<number>(ActionTypes.deleteTodo);

export function* fetchTodosAsync() {
  const todos = () => axios.get<Todo[]>(url);
  const request = yield call(todos);
  yield put<GetTodosAction>({
    type: ActionTypes.getTodos,
    payload: request.data
  });
}

export function* watchTodoSagas() {
  yield takeEvery(ActionTypes.fetchTodos, fetchTodosAsync);
}
