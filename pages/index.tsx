import * as React from 'react';
import { connect } from 'react-redux';
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

const _App: React.FC<AppProps> = props => {
  const [fetching, setFetching] = React.useState<AppState | boolean>(false);
  const onButtonClick = (): void => {
    props.fetchTodos();
    setFetching(true);
  };
  const onTodoClick = (id: number): void => {
    props.deleteTodo(id);
  };
  const renderLists = (): JSX.Element[] => {
    return props.todos.map((todo: Todo) => {
      return (
        <div onClick={() => onTodoClick(todo.id)} key={todo.id}>
          {todo.title}
        </div>
      );
    });
  };
  React.useEffect((): void => {
    if (fetching && props.todos.length !== 0) {
      setFetching(false);
    }
  }, [fetching, props.todos]);
  return (
    <div>
      <button onClick={onButtonClick}>Fetch</button>
      {fetching ? 'LOADING' : null}
      {renderLists()}
    </div>
  );
};

const mapStateToProps = ({ todos }: StoreState): { todos: Todo[] } => {
  return {
    todos
  };
};

const App = connect(
  mapStateToProps,
  { fetchTodos, deleteTodo }
)(_App);

export default App;
