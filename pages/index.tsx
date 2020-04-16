import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Todo, fetchTodos, deleteTodo } from '../actions';
import { StoreState } from '../reducers';

interface AppProps {
  todos: Todo[];
  fetchTodos: Function;
  deleteTodo: typeof deleteTodo;
}

interface AppState {
  fetching: boolean;
}

const App: React.FC<AppProps> = props => {
  const dispatch = useDispatch();
  const todos = useSelector((state: StoreState): Todo[] => {
    return state.todos;
  });
  const [fetching, setFetching] = React.useState<AppState | boolean>(false);
  const onButtonClick = (): void => {
    dispatch(fetchTodos());
    setFetching(true);
  };
  const onTodoClick = (id: number): void => {
    dispatch(deleteTodo(id));
  };
  const renderLists = (): JSX.Element[] => {
    return todos.map((todo: Todo) => {
      return (
        <div onClick={() => onTodoClick(todo.id)} key={todo.id}>
          {todo.title}
        </div>
      );
    });
  };
  React.useEffect((): void => {
    if (fetching && todos.length !== 0) {
      setFetching(false);
    }
  }, [fetching, todos]);
  return (
    <div>
      <button onClick={onButtonClick}>Fetch</button>
      {fetching ? 'LOADING' : null}
      {renderLists()}
    </div>
  );
};

export default App;
