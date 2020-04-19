import '@testing-library/jest-dom'
import React from 'react'
import { Provider } from 'react-redux'
import { render, fireEvent } from '@testing-library/react'
import { fetchTodos, deleteTodo } from '@containers/Todo/action'
import configureMockStore from 'redux-mock-store'
import createSagaMiddleware from 'redux-saga'
import TodoPage from '../todos'

const sagaMiddleware = createSagaMiddleware()
const mockStore = configureMockStore([sagaMiddleware])
const props = {
  fetchTodos,
  deleteTodo,
  todos: [],
  fetching: false,
}

const mockTodos = [
  {
    id: 1,
    title: 'first title',
    completed: false,
  },
  {
    id: 2,
    title: 'second title',
    completed: true,
  },
  {
    id: 3,
    title: 'third title',
    completed: false,
  },
]

describe('<TodoPage />', () => {
  let store
  let component

  beforeEach(() => {
    store = mockStore({
      todos: [],
    })
    store.dispatch = jest.fn()
    component = render(
      <Provider store={store}>
        <TodoPage {...props} />
      </Provider>
    )
  })

  test('should have button', async () => {
    const { getByText } = component
    expect(getByText('Fetch')).toBeInTheDocument()
  })

  test('should display loading when button is click', async () => {
    const { getByText, findByTestId } = component
    const buttonFetch = await findByTestId('button-fetch')
    fireEvent.click(buttonFetch)
    expect(getByText('LOADING')).toBeInTheDocument()
  })

  test('should call fetchTodos when button is click', async () => {
    const { findByTestId } = component
    const buttonFetch = await findByTestId('button-fetch')
    fireEvent.click(buttonFetch)
    expect(store.dispatch).toHaveBeenCalledTimes(1)
    expect(store.dispatch).toHaveBeenCalledWith(fetchTodos())
  })

  test('should call fetchTodos when button is click', async () => {
    store = mockStore({
      todos: mockTodos,
    })
    store.dispatch = jest.fn()
    const { getByText } = (component = render(
      <Provider store={store}>
        <TodoPage {...props} />
      </Provider>
    ))
    mockTodos.forEach((mockTodo) => expect(getByText(mockTodo.title)).toBeInTheDocument())
  })

  test('shoull call deleteTodo when a single todo list is called', async () => {
    store = mockStore({
      todos: mockTodos,
    })
    store.dispatch = jest.fn()
    const { findByTestId } = (component = render(
      <Provider store={store}>
        <TodoPage {...props} />
      </Provider>
    ))
    const id = mockTodos[0].id
    const todo = await findByTestId(`todo-list-${id}`)
    fireEvent.click(todo)
    expect(store.dispatch).toHaveBeenCalledTimes(1)
    expect(store.dispatch).toHaveBeenCalledWith(deleteTodo(id))
  })
})
