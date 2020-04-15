import { FetchTodosAction, GetTodosAction, DeleteTodoAction } from './todos';

export enum ActionTypes {
  fetchTodos = 'TODOS/FETCH_TODOS',
  getTodos = 'TODOS/GET_TODOS',
  deleteTodo = 'TODOS/DELETE_TODO'
}

export type Action = FetchTodosAction | DeleteTodoAction | GetTodosAction;
