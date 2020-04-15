import { Todo, Action, ActionTypes } from '../actions';

export const todosReducers = (state: Todo[] = [], action: Action) => {
  switch (action.type) {
    case ActionTypes.getTodos:
      return action.payload;
    case ActionTypes.deleteTodo:
      return state.filter((todo: Todo) => todo.id !== action.payload);
    default:
      return state;
  }
};
